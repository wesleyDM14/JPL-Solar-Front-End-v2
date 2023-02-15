import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import { TextInput } from '../FormLib/index.js';
import * as Yup from 'yup';

import { deleteClientById, updateClient } from '../../auth/actions/clientActions.js';
import {
    ClientListContainer,
    ClientListHeader,
    ListLabel,
    SingleClient,
    ClientSingleContainer,
    StyledLabel,
    ClientValue,
    AdminClientContainer,
    EditIcon,
    DeleteIcon,
    DeleteContainer,
    DeleteTitle,
    DeleteButtonContainer,
    CancelButton,
    ConfirmButton,
    StyledFormArea,
    StyledTitle,
    ButtonGroup,
    StyledFormButton,
    IconContactContaier,
    ClientContactContainer
} from './style.js';
import {
    FaEdit,
    FaTrash,
    FaUser,
    FaPhone,
    FaGlobe,
    FaWhatsapp
} from 'react-icons/fa';
import { ThreeDots } from "react-loader-spinner";
import { colors, modalStyles } from "../globalStyles";
import { useState } from 'react';

const ClientList = ({ clients, user, setLoading, navigate }) => {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState({});

    const openDeleteModal = () => {
        setModalDeleteIsOpen(true);
    }

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false);
    }

    const openUpdateModal = () => {
        setModalUpdateIsOpen(true);
    }

    const closeUpdateModal = () => {
        setModalUpdateIsOpen(false);
    }

    return (
        <ClientListContainer>
            <ClientListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel>Contato</ListLabel>
                <ListLabel>Cidade</ListLabel>
            </ClientListHeader>
            {
                clients.map((client) => (
                    <SingleClient key={client.id}>
                        <ClientSingleContainer onClick={() => navigate(`/clients/client/${client.id}/solar-plants`)}>
                            <StyledLabel>Cliente: </StyledLabel>
                            <ClientValue>{client.name}</ClientValue>
                        </ClientSingleContainer>
                        <ClientContactContainer>
                            <IconContactContaier href={`https://whatsa.me/55${client.contact}`} target='_blank'>
                                <FaWhatsapp />
                            </IconContactContaier>
                            <ClientValue href={`https://whatsa.me/55${client.contact}`} target='_blank'>{client.contact}</ClientValue>
                        </ClientContactContainer>
                        <ClientSingleContainer onClick={() => navigate(`/clients/client/${client.id}/solar-plants`)}>
                            <StyledLabel>Cidade: </StyledLabel>
                            <ClientValue>{client.address}</ClientValue>
                        </ClientSingleContainer>
                        <AdminClientContainer>
                            <EditIcon>
                                <FaEdit onClick={() => {
                                    setSelectedClient(client);
                                    openUpdateModal();
                                }} />
                            </EditIcon>
                            <Modal
                                isOpen={modalUpdateIsOpen}
                                onRequestClose={closeUpdateModal}
                                style={modalStyles}
                            >
                                <StyledFormArea>
                                    <StyledTitle color={colors.theme} size={30}>Atualizar Cliente</StyledTitle>
                                    <Formik
                                        initialValues={{
                                            id: selectedClient.id,
                                            name: selectedClient.name,
                                            contact: selectedClient.contact,
                                            address: selectedClient.address,
                                            fixerId: selectedClient.fixerId,
                                        }}
                                        validationSchema={
                                            Yup.object({
                                                name: Yup.string().required("Required"),
                                                contact: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
                                                    .min(10, "to short").max(11, "to long"),
                                                address: Yup.string(),
                                            })
                                        }
                                        onSubmit={(values, { setSubmitting, setFieldError }) => {
                                            updateClient(values, setFieldError, setSubmitting, closeUpdateModal, setLoading);
                                        }}
                                    >
                                        {
                                            ({ isSubmitting }) => (
                                                <Form>
                                                    <TextInput
                                                        name="name"
                                                        type="text"
                                                        label="Nome"
                                                        placeholder="Digite o nome do cliente..."
                                                        icon={<FaUser />}
                                                        width={350}
                                                    />
                                                    <TextInput
                                                        name="contact"
                                                        type="text"
                                                        label="Telefone"
                                                        placeholder="Digite o telefone do cliente..."
                                                        icon={<FaPhone />}
                                                        width={350}
                                                    />
                                                    <TextInput
                                                        name="address"
                                                        type="text"
                                                        label="Endereço"
                                                        placeholder="Digite o endereço do cliente..."
                                                        icon={<FaGlobe />}
                                                        width={350}
                                                    />
                                                    <ButtonGroup>
                                                        {!isSubmitting && (
                                                            <StyledFormButton type='submit'>
                                                                Atualizar
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
                            <DeleteIcon>
                                <FaTrash onClick={
                                    () => {
                                        setSelectedClient(client);
                                        openDeleteModal();
                                    }
                                } />
                            </DeleteIcon>
                            <Modal
                                isOpen={modalDeleteIsOpen}
                                onRequestClose={closeDeleteModal}
                                style={modalStyles}
                            >
                                <DeleteContainer>
                                    <DeleteTitle>Quer realmente excluir {selectedClient.name}?</DeleteTitle>
                                    <DeleteButtonContainer>
                                        <CancelButton onClick={
                                            () => {
                                                setSelectedClient({});
                                                closeDeleteModal();
                                            }
                                        }>Cancelar</CancelButton>
                                        <ConfirmButton onClick={
                                            async () => {
                                                await deleteClientById(user, selectedClient, setLoading);
                                            }
                                        }>Confirmar</ConfirmButton>
                                    </DeleteButtonContainer>
                                </DeleteContainer>
                            </Modal>
                        </AdminClientContainer>
                    </SingleClient>
                ))
            }
        </ClientListContainer>
    )
}

export default ClientList;