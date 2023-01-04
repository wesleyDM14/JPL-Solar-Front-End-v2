import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getClientsByUserLogedIn, registerClient } from "../../auth/actions/clientActions";

import {
    ClientsContainer,
    ClientsHeader,
    ClientsTitleContainer,
    IconTitleContainer,
    ClientsTitle,
    RegisterContainer,
    IconRegisterContainer,
    RegisterTitle,
    StyledFormArea,
    StyledTitle,
    ButtonGroup,
    StyledFormButton,
    LoadingContainer
} from './style.js';
import {
    FaUserAlt,
    FaPlusCircle,
    FaUser,
    FaPhone,
    FaGlobe,
} from 'react-icons/fa';
import {
    TextInput,
} from '../FormLib';
import { ThreeDots } from "react-loader-spinner";
import { modalStyles, colors } from "../globalStyles";

import ClientList from "./clientList";

const ClientsPage = ({ user, navigate }) => {

    Modal.setAppElement(document.getElementById('root'));
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const [clients, setClients] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    useEffect(() => {
        async function loadDataClients() {
            if (loading) {
                let temp = await getClientsByUserLogedIn({ user, setLoading });
                setClients(temp);
            }
        }
        loadDataClients();
    },[user, loading]);

    return (
        <ClientsContainer>
            <ClientsHeader>
                <ClientsTitleContainer>
                    <IconTitleContainer>
                        <FaUserAlt />
                    </IconTitleContainer>
                    <ClientsTitle>Clientes</ClientsTitle>
                </ClientsTitleContainer>
                <RegisterContainer>
                    <IconRegisterContainer>
                        <FaPlusCircle onClick={openModal} />
                    </IconRegisterContainer>
                    <RegisterTitle>Adicionar Cliente</RegisterTitle>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={modalStyles}
                    >
                        <StyledFormArea>
                            <StyledTitle color={colors.theme} size={30}>Cadastro de Cliente</StyledTitle>
                            <Formik
                                initialValues={{
                                    name: '',
                                    contact: '',
                                    address: '',
                                    fixerId: user.id,
                                }}
                                validationSchema={
                                    Yup.object({
                                        name: Yup.string().required("Obrigatório"),
                                        contact: Yup.string().matches(phoneRegExp, 'Numero de Telefone Inválido').min(10, 'Numero muito curto').max(11, "Numero muito grande"),
                                        address: Yup.string(),
                                    })
                                }
                                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                    await registerClient(values, setFieldError, setSubmitting, closeModal, setLoading);
                                }}
                            >
                                {
                                    ({ isSubmitting }) => (
                                        <Form>
                                            <TextInput
                                                name='name'
                                                type='text'
                                                label='Nome'
                                                placeholder='Digite o nome do cliente'
                                                icon={<FaUser />}
                                                width={350}
                                            />
                                            <TextInput
                                                name="contact"
                                                type="text"
                                                label="Telefone"
                                                placeholder="Digite o telefone do cliente"
                                                icon={<FaPhone />}
                                                width={350}
                                            />
                                            <TextInput
                                                name="address"
                                                type="text"
                                                label="Endereço"
                                                placeholder="Digite o endereço do cliente"
                                                icon={<FaGlobe />}
                                                width={350}
                                            />
                                            <ButtonGroup>
                                                {!isSubmitting && (
                                                    <StyledFormButton type='submit'>
                                                        Registrar
                                                    </StyledFormButton>
                                                )}
                                                {isSubmitting && (
                                                    <ThreeDots
                                                        color={colors.theme}
                                                        height={49}
                                                        width={100}
                                                    />
                                                )}
                                            </ButtonGroup>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </StyledFormArea>
                    </Modal>
                </RegisterContainer>
            </ClientsHeader>
            {
                loading ? (
                    <LoadingContainer>
                        <ThreeDots
                            color={colors.dark3}
                            height={80}
                            width={300}
                        />
                    </LoadingContainer>
                ) : (
                    <ClientList clients={clients} user={user} setLoading={setLoading} navigate={navigate}/>
                )
            }
        </ClientsContainer>
    )
}

export default ClientsPage;