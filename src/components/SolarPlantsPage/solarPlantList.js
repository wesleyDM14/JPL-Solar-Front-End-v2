import { useState } from 'react';
import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import { TextInput, DateInput, SelectInput } from '../FormLib';
import * as Yup from 'yup';

import {
    SolarPlantsCards,
    SingleSolarPlant,
    IconSolarPlantContainer,
    SolarPlantsInfo,
    InfoTitle,
    InfoValue,
    SolarPlantsOperations,
    IconOperation,
    SolarPlantsAdmin,
    IconEdit,
    IconDelete,
    StyledFormArea,
    StyledTitle,
    StyledFormButton,
    ButtonGroup,
    DeleteContainer,
    DeleteTitle,
    DeleteButtonContainer,
    CancelButton,
    ConfirmButton
} from "./style.js";
import {
    FaSolarPanel,
    FaEdit,
    FaTrash,
    FaSun,
    FaGlobe,
    FaHashtag,
    FaUser,
    FaLock,
    FaFax,
    FaBolt,
    FaCode,
    FaCalendar
} from 'react-icons/fa';
import { colors, modalStyles } from '../globalStyles';
import { ThreeDots } from "react-loader-spinner";
import { deletePlantById, updateSolarPlant } from '../../auth/actions/solarPlantsActions';

const SolarPlantsList = ({ solarPlants, clientId, setLoading, navigate }) => {
    const [selectedSolarPlant, setSelectedSolarPlant] = useState({});
    const [selectedInverter, setSelectedInverter] = useState();
    const [selectedInstallationDate, setSelectedInstallationDate] = useState(new Date());
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

    const openUpdateModal = () => {
        setModalUpdateIsOpen(true);
    }

    const closeUpdateModal = () => {
        setModalUpdateIsOpen(false);
    }

    const openDeleteModal = () => {
        setModalDeleteIsOpen(true);
    }

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false);
    }

    const handleChangeInverter = (value) => {
        setSelectedInverter(value);
    }

    const handleChangeDate = (value) => {
        setSelectedInstallationDate(value);
    }

    return (
        <SolarPlantsCards>
            {
                solarPlants.map((plant) => (
                    <SingleSolarPlant key={plant.id}>
                        <IconSolarPlantContainer>
                            <FaSolarPanel />
                        </IconSolarPlantContainer>
                        <SolarPlantsInfo>
                            <InfoTitle>Localização: </InfoTitle>
                            <InfoValue>{plant.local}</InfoValue>
                            <InfoTitle>Potência Instalada: </InfoTitle>
                            <InfoValue>{plant.installedPower} kWp</InfoValue>
                        </SolarPlantsInfo>
                        <SolarPlantsOperations>
                            <IconOperation>
                                <FaSun />
                            </IconOperation>
                            <SolarPlantsAdmin>
                                <IconEdit onClick={() => {
                                    setSelectedSolarPlant(plant);
                                    setSelectedInverter(plant.inverter);
                                    setSelectedInstallationDate(plant.installationDate);
                                    openUpdateModal();
                                }}>
                                    <FaEdit />
                                </IconEdit>
                                <Modal
                                    isOpen={modalUpdateIsOpen}
                                    onRequestClose={closeUpdateModal}
                                    style={modalStyles}
                                >
                                    <StyledFormArea>
                                        <StyledTitle color={colors.theme} size={30}>Atualizar Planta Solar</StyledTitle>
                                        <Formik
                                            initialValues={{
                                                id: selectedSolarPlant.id,
                                                code: selectedSolarPlant.code,
                                                local: selectedSolarPlant.local,
                                                installationDate: selectedSolarPlant.installationDate,
                                                inverter: selectedSolarPlant.inverter,
                                                inverterPot: selectedSolarPlant.inverterPot,
                                                panel: selectedSolarPlant.panel,
                                                panelPower: selectedSolarPlant.panelPower,
                                                numberPanel: selectedSolarPlant.numberPanel,
                                                estimatedGeneration: selectedSolarPlant.estimatedGeneration,
                                                login: selectedSolarPlant.login,
                                                password: selectedSolarPlant.password,
                                                clientId: selectedSolarPlant.clientId,
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
                                                values.inverter = selectedInverter;
                                                values.installationDate = selectedInstallationDate;
                                                await updateSolarPlant(values, setFieldError, setSubmitting, setLoading, closeUpdateModal)
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
                                                            initialValue={new Date(selectedSolarPlant.installationDate)}
                                                        />
                                                        <SelectInput
                                                            name='inverter'
                                                            label='Marca do Inversor'
                                                            icon={<FaFax />}
                                                            handleChange={handleChangeInverter}
                                                            initialValue={selectedSolarPlant.inverter}
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
                                <IconDelete onClick={() => {
                                    setSelectedSolarPlant(plant);
                                    openDeleteModal();
                                }}>
                                    <FaTrash />
                                </IconDelete>
                                <Modal
                                    isOpen={modalDeleteIsOpen}
                                    onRequestClose={closeDeleteModal}
                                    style={modalStyles}
                                >
                                    <DeleteContainer>
                                        <DeleteTitle>Quer realmente excluir a planta solar?</DeleteTitle>
                                        <DeleteButtonContainer>
                                            <CancelButton onClick={
                                                () => {
                                                    setSelectedSolarPlant({});
                                                    closeDeleteModal();
                                                }
                                            }>Cancelar</CancelButton>
                                            <ConfirmButton onClick={
                                                async () => {
                                                    await deletePlantById(selectedSolarPlant, setLoading);
                                                }
                                            }>Confirmar</ConfirmButton>
                                        </DeleteButtonContainer>
                                    </DeleteContainer>
                                </Modal>
                            </SolarPlantsAdmin>
                        </SolarPlantsOperations>
                    </SingleSolarPlant>
                ))
            }
        </SolarPlantsCards>
    )
}

export default SolarPlantsList;