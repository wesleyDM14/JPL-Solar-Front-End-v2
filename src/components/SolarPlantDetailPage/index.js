import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPlantById } from "../../auth/actions/solarPlantsActions";
import { ThreeDots } from "react-loader-spinner";
import { colors } from "../globalStyles";
import {
    Greeting,
    Header,
    LoadingContainer,
    SolarPlantDetailContainer,
    Title,
    TitleContent,
    TitleDescription,
    TitleIconContainer,
    InfoHome,
    InfoHomeCard,
    InfoHomeDetail,
    InfoHomeIconContainer,
    InfoHomeTitle,
    MainCards,
    BoltIconContainer,
    CardInner,
    CardInnertitle,
    CardInnerContentContainer,
    CardInnerContent,
    Card,
    ChartsCards,
    ChartsLeft,
    ChartsLeftTitle,
    ChartsLeftTitleContainer,
    ChartsLeftTitleContent,
    ChartsLeftIconContainer
} from "./style";
import {
    FaAddressBook,
    FaBolt,
    FaHome,
} from 'react-icons/fa';
import { getClientById } from "../../auth/actions/clientActions";

const SolarPlantDetailPage = () => {
    const { id, clientId } = useParams();
    const [plant, setPlant] = useState({});
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);
    const [inverter, setInverter] = useState({});
    const [inverterDevice, setInverterDevice] = useState('');
    const [solarPlant, setSolarPlant] = useState([]);
    const [powerData, setPowerData] = useState([]);

    useEffect(() => {
        async function loadPlantData() {
            if (loading) {
                await getClientById({ clientId, setClient });
                await getPlantById({ id, setPlant, setLoading });
            }
            if (dataLoading) {
                if (Object.keys(plant)[0]) {
                    let plantServerId = Object.keys(plant)[0];
                    let plantServer = plant[plantServerId];
                    let inverterTemp = Object.keys(plantServer['devices']);
                    let inverterServer = plantServer['devices'][inverterTemp];
                    setInverterDevice(inverterTemp);
                    setInverter(inverterServer);
                    setSolarPlant(plantServer);
                    setPowerData(inverterServer.historyAll);
                    console.log(plantServer);
                    setDataLoading(false);
                }
            }
        }
        loadPlantData();
    }, [loading, id, dataLoading, plant, clientId]);

    return (
        <div>
            {
                dataLoading ? (
                    <LoadingContainer>
                        <ThreeDots
                            color={colors.dark3}
                            height={80}
                            width={350}
                        />
                    </LoadingContainer>
                ) : (
                    <SolarPlantDetailContainer>
                        <Header>
                            <Title>
                                <TitleIconContainer>
                                    <FaAddressBook />
                                </TitleIconContainer>
                                <Greeting>
                                    <TitleContent>{client.name}</TitleContent>
                                    <TitleDescription>Planta solar instalada por: JPL Engenharia</TitleDescription>
                                </Greeting>
                            </Title>
                            <InfoHome>
                                <InfoHomeIconContainer>
                                    <FaHome />
                                </InfoHomeIconContainer>
                                {
                                    solarPlant.weather.data.HeWeather6[0].status === 'permission denied' ?
                                        (
                                            <InfoHomeCard>
                                                <InfoHomeTitle> - °C</InfoHomeTitle>
                                                <InfoHomeDetail> ----- </InfoHomeDetail>
                                                <InfoHomeDetail> Nascer do Sol - Por do Sol</InfoHomeDetail>
                                                <InfoHomeDetail>- - -</InfoHomeDetail>
                                            </InfoHomeCard>
                                        ) : (
                                            <InfoHomeCard>
                                                <InfoHomeTitle>
                                                </InfoHomeTitle>
                                                <InfoHomeDetail></InfoHomeDetail>
                                                <InfoHomeDetail></InfoHomeDetail>
                                                <InfoHomeDetail></InfoHomeDetail>
                                            </InfoHomeCard>
                                        )
                                }
                            </InfoHome>
                        </Header>
                        <MainCards>
                            <Card>
                                <BoltIconContainer>
                                    <FaBolt />
                                </BoltIconContainer>
                                <CardInner>
                                    <CardInnertitle>{inverter.totalData.eToday}</CardInnertitle>
                                    <CardInnerContentContainer>
                                        <CardInnerContent>kWh</CardInnerContent>
                                        <CardInnerContent>hoje</CardInnerContent>
                                    </CardInnerContentContainer>
                                </CardInner>
                            </Card>
                            <Card>
                                <BoltIconContainer>
                                    <FaBolt />
                                </BoltIconContainer>
                                <CardInner>
                                    <CardInnertitle>{inverter.deviceData.eMonth}</CardInnertitle>
                                    <CardInnerContentContainer>
                                        <CardInnerContent>kWh</CardInnerContent>
                                        <CardInnerContent>Mês</CardInnerContent>
                                    </CardInnerContentContainer>
                                </CardInner>
                            </Card>
                            <Card>
                                <BoltIconContainer>
                                    <FaBolt />
                                </BoltIconContainer>
                                <CardInner>
                                    <CardInnertitle>{inverter.totalData.eTotal}</CardInnertitle>
                                    <CardInnerContentContainer>
                                        <CardInnerContent>kWh</CardInnerContent>
                                        <CardInnerContent>total</CardInnerContent>
                                    </CardInnerContentContainer>
                                </CardInner>
                            </Card>
                        </MainCards>
                        <ChartsCards>
                            <ChartsLeft>
                                <ChartsLeftTitle>
                                    <ChartsLeftTitleContainer>
                                        <ChartsLeftTitleContent>Geração por Tempo</ChartsLeftTitleContent>
                                    </ChartsLeftTitleContainer>
                                    <ChartsLeftIconContainer>
                                        <FaBolt />
                                    </ChartsLeftIconContainer>
                                </ChartsLeftTitle>
                            </ChartsLeft>
                        </ChartsCards>
                    </SolarPlantDetailContainer>
                )
            }
        </div>
    )
}

export default SolarPlantDetailPage;