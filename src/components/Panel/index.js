import { useEffect, useState } from 'react';

import { ThreeDots } from 'react-loader-spinner';
import { FaBolt, FaCircle, FaExclamationTriangle, FaHouzz } from 'react-icons/fa';
import { colors } from "../globalStyles.js";

import {
    MainContainer,
    TitleContainer,
    LogoImage,
    GreetingContainer,
    GreetingTitle,
    GreetingSubTitle,
    MainCards,
    Card,
    CardIconContainer1,
    CardInner,
    TextPrimaty,
    TextCardTitle,
    CardTitle,
    CardIconContainer2,
    TitleCardsPanelContainer,
    TitleCardsPanelContent,
    CardsMainPanel,
    CardPanel,
    CardPanelStatusActive,
    CardPanelStatusError,
    CardPanelTitle,
    CardPanelInner,
    CardPanelName,
    CardPanelProdution,
    CardPanelEnergy,
    EnergyContent
} from './style';

import { getTotalData, getAllSolarPlant } from '../../auth/actions/solarPlantsActions.js';

const Panel = ({ user, navigate }) => {

    const [loading, setLoading] = useState(true);
    const [numUsinas, setNumUsinas] = useState(0);
    const [powerInstaled, setPowerInstaled] = useState(0);
    const [solarPlants, setSolarPlants] = useState([]);
    const [solarPlantsWithError, setSolarPlantsWithError] = useState([]);
    const [plantsLoading, setPlantsLoading] = useState(true);

    useEffect(() => {
        async function getDashboardInfo() {
            getTotalData({ setLoading, setNumUsinas, setPowerInstaled });
        }
        getDashboardInfo();
    }, []);

    useEffect(() => {
        async function getSolarPlantsInfo() {
            if (plantsLoading) {
                getAllSolarPlant({ setPlantsLoading, setSolarPlants, setSolarPlantsWithError });
            }
        }
        getSolarPlantsInfo();
    }, [plantsLoading]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlantsLoading(true);
        }, 900000);
        return () => clearInterval(interval);
    },[]);

    return (
        <div>
            {
                loading ? (
                    <div style={{
                        background: '#f3f4f6',
                        overflowY: 'auto',
                        gridArea: 'main',
                        padding: '25%'
                    }}>
                        <ThreeDots
                            color={colors.dark3}
                            height={80}
                            width={300}
                        />
                    </div>
                ) : (
                    <MainContainer>
                        <TitleContainer>
                            <LogoImage />
                            <GreetingContainer>
                                <GreetingTitle>Sistema JPL Solar</GreetingTitle>
                                <GreetingSubTitle>Bem Vindo ao seu painel</GreetingSubTitle>
                            </GreetingContainer>
                        </TitleContainer>
                        <MainCards>
                            <Card>
                                <CardTitle>
                                    <CardIconContainer1><FaHouzz /></CardIconContainer1>
                                    <TextPrimaty>Quantidade de Usinas</TextPrimaty>
                                </CardTitle>
                                <CardInner>
                                    <TextCardTitle>{numUsinas}</TextCardTitle>
                                </CardInner>
                            </Card>
                            <Card>
                                <CardTitle>
                                    <CardIconContainer2><FaBolt /></CardIconContainer2>
                                    <TextPrimaty>Potência Total Instalada</TextPrimaty>
                                </CardTitle>
                                <CardInner>
                                    <TextCardTitle>{powerInstaled.toFixed(2)} kWp</TextCardTitle>
                                </CardInner>
                            </Card>
                        </MainCards>
                        <TitleCardsPanelContainer>
                            <TitleCardsPanelContent>Visão Geral das Plantas Solares</TitleCardsPanelContent>
                        </TitleCardsPanelContainer>
                        {
                            plantsLoading ? (
                                <div style={{
                                    background: '#f3f4f6',
                                    overflowY: 'auto',
                                    gridArea: 'main',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    marginTop: '100px'
                                }}>
                                    <ThreeDots
                                        color={colors.dark3}
                                        height={80}
                                        width={300}
                                    />
                                </div>
                            ) : (
                                <CardsMainPanel>
                                    {
                                        solarPlantsWithError.map((element, i) => (
                                            <CardPanel key={i} onClick={() => navigate(`/clients/client/${element.clientId}/solar-plant/${element.plantId}`)}>
                                                <CardPanelStatusError><FaExclamationTriangle /></CardPanelStatusError>
                                                <CardPanelInner>
                                                    <CardPanelTitle>{element.codUsina}</CardPanelTitle>
                                                    <CardPanelName>{element.clientName.toLowerCase()}</CardPanelName>
                                                </CardPanelInner>
                                                <CardPanelProdution>
                                                    <CardPanelEnergy><FaBolt /></CardPanelEnergy>
                                                    <EnergyContent>{parseFloat(element.eTotal) > 1000 ? (parseFloat(element.eTotal) / 1000).toFixed(2) + ' MWh' : parseFloat(element.eTotal).toFixed(2) + ' kWh'}</EnergyContent>
                                                </CardPanelProdution>
                                            </CardPanel>
                                        ))
                                    }
                                    {
                                        solarPlants.map((element, i) => (
                                            <CardPanel key={i} onClick={() => navigate(`/clients/client/${element.clientId}/solar-plant/${element.plantId}`)}>
                                                <CardPanelStatusActive><FaCircle /></CardPanelStatusActive>
                                                <CardPanelInner>
                                                    <CardPanelTitle>{element.codUsina}</CardPanelTitle>
                                                    <CardPanelName>{element.clientName}</CardPanelName>
                                                </CardPanelInner>
                                                <CardPanelProdution>
                                                    <CardPanelEnergy><FaBolt /></CardPanelEnergy>
                                                    <EnergyContent>{parseFloat(element.eTotal) > 1000 ? (parseFloat(element.eTotal) / 1000).toFixed(2) + ' MWh' : parseFloat(element.eTotal).toFixed(2) + ' kWh'}</EnergyContent>
                                                </CardPanelProdution>
                                            </CardPanel>
                                        ))
                                    }
                                </CardsMainPanel>
                            )
                        }
                    </MainContainer >
                )
            }
        </div >
    )
}

export default Panel;