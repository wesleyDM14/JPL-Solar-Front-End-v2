import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';

import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { TextInput, SelectInput, DateInput } from "../FormLib/index.js";

import { registerSolarPlant, getSolarPlantsByClientId } from "../../auth/actions/solarPlantsActions.js";

import {
    SolarPlantsContainer,
    SolarPlantsHeader,
    SolarPlantsTitleContainer,
    IconTitleContainer,
    SolarPlantsTitle,
    RegisterContainer,
    IconRegisterContainer,
    RegisterTitle,
    StyledFormArea,
    StyledTitle,
    StyledFormButton,
    ButtonGroup
} from './style.js';
import {
    FaSolarPanel,
    FaPlusCircle,
    FaGlobe,
    FaHashtag,
    FaUser,
    FaLock,
    FaFax,
    FaBolt,
    FaCode,
    FaCalendar,
} from 'react-icons/fa';
import { ThreeDots } from "react-loader-spinner";
import { modalStyles, colors } from "../globalStyles";

const SolarPlantsPage = () => {

    Modal.setAppElement(document.getElementById('root'));
    const { id } = useParams();
    const [solarPlants, setSolarPlants] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedInverter, setSelectedInverter] = useState('abb');
    const [installationDate, setInstallationDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDataPlants() {
            if (loading) {
                await getSolarPlantsByClientId({ id, setSolarPlants, setLoading });
            }
        }
        loadDataPlants();
    }, [id, loading]);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleChange = (value) => {
        setSelectedInverter(value);
    }

    const handleChangeDate = (value) => {
        setInstallationDate(value);
    }

    return (
        <SolarPlantsContainer>
            <SolarPlantsHeader>
                <SolarPlantsTitleContainer>
                    <IconTitleContainer>
                        <FaSolarPanel />
                    </IconTitleContainer>
                    <SolarPlantsTitle>Plantas Solares</SolarPlantsTitle>
                </SolarPlantsTitleContainer>
                <RegisterContainer>
                    <IconRegisterContainer>
                        <FaPlusCircle onClick={openModal} />
                    </IconRegisterContainer>
                    <RegisterTitle>Adicionar Planta Solar</RegisterTitle>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={modalStyles}
                    >
                        <StyledFormArea>
                            <StyledTitle color={colors.theme} size={30}>Cadastro de Plantas Solares</StyledTitle>
                            <Formik
                                initialValues={{
                                    code: "",
                                    local: "",
                                    installationDate: new Date(),
                                    inverter: "",
                                    inverterPot: "",
                                    panel: "",
                                    panelPower: "",
                                    numberPanel: "",
                                    estimatedGeneration: "",
                                    login: "",
                                    password: "",
                                    clientId: "",
                                }}
                                validationSchema={
                                    Yup.object({
                                        code: Yup.string().required('Required'),
                                        local: Yup.string().required("Required"),
                                        installationDate: Yup.date().required('Required'),
                                        inverterPot: Yup.number().required("Required"),
                                        panel: Yup.string().required("Required"),
                                        panelPower: Yup.number().required("Required"),
                                        numberPanel: Yup.number().required("Required"),
                                        estimatedGeneration: Yup.number().required('Required'),
                                        login: Yup.string().required("Required"),
                                        password: Yup.string().required("Required"),
                                    })
                                }
                                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                    values.clientId = parseInt(id);
                                    values.inverter = selectedInverter;
                                    values.installationDate = installationDate;
                                    await registerSolarPlant(values, setFieldError, setSubmitting, closeModal, setLoading);
                                }}
                            >
                                {
                                    ({ isSubmitting }) => (
                                        <Form>
                                            <TextInput
                                                name='code'
                                                type='text'
                                                label='Código da Usina Solar'
                                                placeholder='Digite o código da Usina'
                                                icon={<FaCode />}
                                                width={350}
                                            />
                                            <TextInput
                                                name='local'
                                                type='text'
                                                label='Local de Instalação'
                                                placeholder='Digite o local de instalação da usina'
                                                icon={<FaGlobe />}
                                                width={350}
                                            />
                                            <DateInput
                                                name='installationDate'
                                                label='Data de Instalação'
                                                icon={<FaCalendar />}
                                                handleChange={handleChangeDate}
                                                initialValue={new Date()}
                                            />
                                            <SelectInput
                                                name='inverter'
                                                label='Marca do Inversor'
                                                icon={<FaFax />}
                                                handleChange={handleChange}
                                                initialValue={'abb'}
                                            />
                                            <TextInput
                                                name="inverterPot"
                                                type="number"
                                                label="Potência do inversor (kWp)"
                                                placeholder="Digite a potência do inversor"
                                                icon={<FaBolt />}
                                                width={350}
                                            />
                                            <TextInput
                                                 name="panel"
                                                 type="text"
                                                 label="Marca dos Painéis Solares"
                                                 placeholder="Digite a marca dos painéis solares"
                                                icon={<FaSolarPanel />}
                                                width={350}
                                            />
                                            <TextInput
                                                name="panelPower"
                                                type="number"
                                                label="Potência do Painel Solar (W)"
                                                placeholder="Digite a potência do painel solar"
                                                icon={<FaBolt />}
                                                width={350}
                                            />
                                            <TextInput
                                                name="numberPanel"
                                                type="number"
                                                label="Quantidade de Painéis Instalado"
                                                placeholder="Digite a quantidade de paineis instalado"
                                                icon={<FaHashtag />}
                                                width={350}
                                            />
                                            <TextInput
                                                name="estimatedGeneration"
                                                type="number"
                                                label="Media de Geração Anual (kWp)"
                                                placeholder="Digite a média da geração Anual"
                                                icon={<FaHashtag />}
                                                width={350}
                                            />
                                            <TextInput
                                                name="login"
                                                type="text"
                                                label="Login de Monitoramento"
                                                placeholder="Digite o login de monitoramento"
                                                icon={<FaUser />}
                                                width={350}
                                            />
                                            <TextInput
                                                name="password"
                                                type="password"
                                                label="Senha de Monitoramento"
                                                placeholder="**********"
                                                icon={<FaLock />}
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
            </SolarPlantsHeader>
        </SolarPlantsContainer>
    )
}

export default SolarPlantsPage;