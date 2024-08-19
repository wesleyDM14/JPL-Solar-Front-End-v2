import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getErrorListSolarPlant, getPlantById, getSolarPlantChartByType } from "../../auth/actions/solarPlantsActions";
import { ThreeDots } from "react-loader-spinner";
import { colors } from "../globalStyles";
import 'react-date-picker/dist/DatePicker.css';
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
    Chart,
    ChartTitle,
    ChartTitleContainer,
    ChartTitleContent,
    ChartLeftIconContainer,
    ChartRightIconContainer,
    Device,
    DeviceCards,
    DeviceCardContainer,
    DeviceCardContent,
    DeviceCardIconContainer,
    InfoDeviceIconContainer,
    TableError,
    TableHeaderContent,
    StyledThead,
    TableHeaderContainer,
    SelectedChartContainer,
    ChartSelectedDateContainer,
    ChartTypeSelectedContainer,
    ChartTypeButton,
    SelectedErrorContainer,
    SelectedErrorDateContainer,
    TableBodyContainer,
    TableBodyContent,
    GenerateReportIconContainer,
} from "./style";
import {
    FaAddressBook,
    FaBolt,
    FaBug,
    FaFilePdf,
    FaHome,
    FaPager,
    FaQuestion,
} from 'react-icons/fa';

import Dialog from "@mui/material/Dialog";
import DatePicker from 'react-date-picker';

import { getClientById } from "../../auth/actions/clientActions";
import Graphic from "./graphic";
import * as htmlToImage from 'html-to-image';

const SolarPlantDetailPage = ({ navigate }) => {
    const { id, clientId } = useParams();
    const [plant, setPlant] = useState({});
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);
    const [powerData, setPowerData] = useState([]);
    const [errorList, setErrorList] = useState([]);
    const [currentPlant, setCurrentPlant] = useState({});
    const [openInverterDialog, setOpenInverterDialog] = useState(false);
    const [openDataloggerDialog, setOpenDataloggerDialog] = useState(false);
    const [openStimateDailyDialog, setOpenStimateDailyDialog] = useState(false);
    const [openStimateMouthDialog, setOpenStimateMouthDialog] = useState(false);
    const [date, setDate] = useState(new Date());
    const [errorDate, setErrorDate] = useState(new Date());
    const [type, setType] = useState('time');
    const [chartLoading, setChartLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    const handleOpenStimateDailyDialog = () => {
        setOpenStimateDailyDialog(true);
    }

    const handleCloseStimateDailyDialog = () => {
        setOpenStimateDailyDialog(false);
    }

    const handleOpenStimateMouthDialog = () => {
        setOpenStimateMouthDialog(true);
    }

    const handleCloseStimateMouthDialog = () => {
        setOpenStimateMouthDialog(false);
    }

    const handleCloseInverterDialog = () => {
        setOpenInverterDialog(false);
    }

    const handleOpenInverterDialog = () => {
        setOpenInverterDialog(true);
    }

    const handleCloseDataloggerDialog = () => {
        setOpenDataloggerDialog(false);
    }

    const handleOpenDataloggerDialog = () => {
        setOpenDataloggerDialog(true);
    }

    useEffect(() => {
        async function loadPlantData() {
            if (loading) {
                await getClientById({ clientId, setClient });
                await getPlantById({ id, setPlant, setLoading, setCurrentPlant });
            }
            if (dataLoading) {
                if (/*plant !== {} &&*/ plant.deviceSN !== undefined) {
                    if (plant.deviceSN.deviceTypeName === 'max') {
                        setPowerData(plant.chart.pac);
                    } else if (plant.deviceSN.deviceTypeName === 'tlx') {
                        setPowerData(plant.chart.charts.ppv);
                    }
                    setErrorList(plant.errorLog);
                    setDataLoading(false);
                }
            }
        }
        loadPlantData();
    }, [loading, id, plant, clientId, dataLoading]);

    useEffect(() => {
        async function loadChart() {
            if (chartLoading) {
                getSolarPlantChartByType({ currentPlant, date, type, plant, setPowerData, setChartLoading });
            }
            if (errorLoading) {
                getErrorListSolarPlant({ currentPlant, errorDate, plant, setErrorList, setErrorLoading });
            }
        }
        loadChart();
    }, [date, errorDate, type]);

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
                                    plant.weather.status === 'permission denied' ?
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
                                                    {plant.weather.now.tmp}°C
                                                </InfoHomeTitle>
                                                <InfoHomeDetail>{plant.weather.now.cond_txt} -- {plant.weather.basic.location} / {plant.weather.basic.admin_area}</InfoHomeDetail>
                                                <InfoHomeDetail>Nascer do Sol - Por do Sol</InfoHomeDetail>
                                                <InfoHomeDetail>{plant.weather.basic.sr} - {plant.weather.basic.ss}</InfoHomeDetail>
                                            </InfoHomeCard>
                                        )
                                }
                            </InfoHome>
                        </Header>
                        <MainCards>
                            <Card>
                                <BoltIconContainer onClick={handleOpenStimateDailyDialog} style={{ cursor: 'pointer' }}>
                                    <FaBolt />
                                </BoltIconContainer>
                                <CardInner>
                                    <Dialog
                                        open={openStimateDailyDialog}
                                        onClose={handleCloseStimateDailyDialog}
                                        style={{
                                            textAlign: 'center'
                                        }}
                                    >
                                        <h1 style={{
                                            fontSize: '25px',
                                            color: '#2e4a66',
                                            margin: '10px',
                                            fontWeight: 'bold'
                                        }}>Produção Diária Estimada</h1>
                                        <span style={{
                                            fontSize: '25px',
                                            color: '#2e4a66',
                                            margin: '15px'
                                        }}>{currentPlant.estimatedGeneration / 30} kWh / dia</span>
                                    </Dialog>
                                    <CardInnertitle>{plant.totalData.eToday < 1000 ? (parseFloat(plant.totalData.eToday)).toFixed(2) : (plant.totalData.eToday / 1000).toFixed(2)}</CardInnertitle>
                                    <CardInnerContentContainer>
                                        <CardInnerContent>{plant.totalData.eToday < 1000 ? 'kWh' : 'MWh'}</CardInnerContent>
                                        <CardInnerContent>hoje</CardInnerContent>
                                    </CardInnerContentContainer>
                                </CardInner>
                            </Card>
                            <Card>
                                <BoltIconContainer onClick={handleOpenStimateMouthDialog} style={{ cursor: 'pointer' }}>
                                    <FaBolt />
                                </BoltIconContainer>
                                <CardInner>
                                    <Dialog
                                        open={openStimateMouthDialog}
                                        onClose={handleCloseStimateMouthDialog}
                                        style={{
                                            textAlign: 'center'
                                        }}
                                    >
                                        <h1 style={{
                                            fontSize: '25px',
                                            color: '#2e4a66',
                                            margin: '10px',
                                            fontWeight: 'bold'
                                        }}>Produção Mensal Estimada</h1>
                                        <span style={{
                                            fontSize: '25px',
                                            color: '#2e4a66',
                                            margin: '15px'
                                        }}>{currentPlant.estimatedGeneration} kWh / mês</span>
                                    </Dialog>
                                    <CardInnertitle>{plant.totalData.eMonth < 1000 ? (parseFloat(plant.totalData.eMonth)).toFixed(2) : (plant.totalData.eMonth / 1000).toFixed(2)}</CardInnertitle>
                                    <CardInnerContentContainer>
                                        <CardInnerContent>{plant.totalData.eMonth < 1000 ? 'kWh' : 'MWh'}</CardInnerContent>
                                        <CardInnerContent>Mês</CardInnerContent>
                                    </CardInnerContentContainer>
                                </CardInner>
                            </Card>
                            <Card>
                                <BoltIconContainer>
                                    <FaBolt />
                                </BoltIconContainer>
                                <CardInner>
                                    <CardInnertitle>{plant.totalData.eTotal < 1000 ? (parseFloat(plant.totalData.eTotal)).toFixed(2) : (plant.totalData.eTotal / 1000).toFixed(2)}</CardInnertitle>
                                    <CardInnerContentContainer>
                                        <CardInnerContent>{plant.totalData.eTotal < 1000 ? 'kWh' : 'MWh'}</CardInnerContent>
                                        <CardInnerContent>total</CardInnerContent>
                                    </CardInnerContentContainer>
                                </CardInner>
                            </Card>
                        </MainCards>
                        <ChartsCards>
                            <Chart>
                                <ChartTitle>
                                    <ChartTitleContainer>
                                        <ChartTitleContent>Geração Solar</ChartTitleContent>
                                    </ChartTitleContainer>
                                    <ChartLeftIconContainer>
                                        <FaBolt />
                                    </ChartLeftIconContainer>
                                </ChartTitle>
                                <SelectedChartContainer>
                                    <ChartSelectedDateContainer>
                                        <DatePicker
                                            onChange={
                                                (value) => {
                                                    setDate(value);
                                                    setChartLoading(true);
                                                }
                                            }
                                            value={date}
                                            clearIcon={null}
                                            maxDetail={type === 'time' ? 'month' : type === 'day' ? 'year' : type === 'mouth' ? 'decade' : 'decade'}
                                            minDetail={type === 'time' ? 'year' : type === 'day' ? 'year' : type === 'mouth' ? 'decade' : 'decade'}

                                        />
                                    </ChartSelectedDateContainer>
                                    <ChartTypeSelectedContainer>
                                        <ChartTypeButton onClick={() => {
                                            setType('time');
                                            setChartLoading(true);
                                        }}>Time</ChartTypeButton>
                                        <ChartTypeButton onClick={() => {
                                            setType('day');
                                            setChartLoading(true);
                                        }}>Day</ChartTypeButton>
                                        <ChartTypeButton onClick={() => {
                                            setType('mouth');
                                            setChartLoading(true);
                                        }}>Mouth</ChartTypeButton>
                                        <ChartTypeButton onClick={() => {
                                            setType('year');
                                            setChartLoading(true);
                                        }}>Year</ChartTypeButton>
                                    </ChartTypeSelectedContainer>
                                </SelectedChartContainer>
                                {
                                    chartLoading ? (
                                        <LoadingContainer>
                                            <ThreeDots
                                                color={colors.dark3}
                                                height={350}
                                                width={350}
                                            />
                                        </LoadingContainer>
                                    ) : (
                                        <Graphic powerData={powerData} type={type} inverter={currentPlant.inverter} estimated={currentPlant.estimatedGeneration} />
                                    )
                                }

                            </Chart>
                            <Chart>
                                <ChartTitle>
                                    <ChartTitleContainer>
                                        <ChartTitleContent>Histórico de Erros</ChartTitleContent>
                                    </ChartTitleContainer>
                                    <ChartRightIconContainer>
                                        <FaBug />
                                    </ChartRightIconContainer>
                                </ChartTitle>
                                <SelectedErrorContainer>
                                    <SelectedErrorDateContainer>
                                        <DatePicker
                                            onChange={(value) => {
                                                setErrorDate(value);
                                                setErrorLoading(true);
                                            }}
                                            value={errorDate}
                                            format={'y'}
                                            maxDetail={'decade'}
                                            minDetail={'decade'}
                                            clearIcon={null}
                                        />
                                    </SelectedErrorDateContainer>
                                </SelectedErrorContainer>
                                {
                                    errorLoading ? (
                                        <LoadingContainer>
                                            <ThreeDots
                                                color={colors.dark3}
                                                height={350}
                                                width={350}
                                            />
                                        </LoadingContainer>

                                    ) : (
                                        <TableError>
                                            <StyledThead>
                                                <TableHeaderContainer>
                                                    <TableHeaderContent>Device Serial Number</TableHeaderContent>
                                                    <TableHeaderContent>Alias</TableHeaderContent>
                                                    <TableHeaderContent>Device Type</TableHeaderContent>
                                                    <TableHeaderContent>Time</TableHeaderContent>
                                                    <TableHeaderContent>Event SN</TableHeaderContent>
                                                    <TableHeaderContent>Fault Description</TableHeaderContent>
                                                    <TableHeaderContent>Solution</TableHeaderContent>
                                                </TableHeaderContainer>
                                                {
                                                    errorList.map((element, i) => (
                                                        <TableBodyContainer key={i}>
                                                            <TableBodyContent>{element.sn}</TableBodyContent>
                                                            <TableBodyContent>{element.alias}</TableBodyContent>
                                                            <TableBodyContent>{element.deviceType}</TableBodyContent>
                                                            <TableBodyContent>{element.time}</TableBodyContent>
                                                            <TableBodyContent>{element.eventId}</TableBodyContent>
                                                            <TableBodyContent>{element.eventName}</TableBodyContent>
                                                            <TableBodyContent>{element.solution}</TableBodyContent>
                                                        </TableBodyContainer>
                                                    ))
                                                }
                                            </StyledThead>
                                        </TableError>
                                    )
                                }
                            </Chart>
                        </ChartsCards>
                        <Device>
                            <DeviceCards>
                                <DeviceCardIconContainer>
                                    <FaPager />
                                </DeviceCardIconContainer>
                                <DeviceCardContainer>
                                    <DeviceCardContent>Device serial Number: {plant.deviceSN.alias}<InfoDeviceIconContainer onClick={handleOpenInverterDialog}><FaQuestion /></InfoDeviceIconContainer></DeviceCardContent>
                                    <Dialog
                                        open={openInverterDialog}
                                        onClose={handleCloseInverterDialog}
                                    >
                                        <table style={{ margin: '5px' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Mode </td>
                                                    <td style={{ fontSize: '12px' }}>{plant.deviceSNInfo.modelText}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Version: </td>
                                                    <td style={{ fontSize: '12px' }}>{plant.deviceSNInfo.innerVersion}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Communication version number: </td>
                                                    <td style={{ fontSize: '12px' }}>{plant.deviceSNInfo.communicationVersion}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Build number: </td>
                                                    <td style={{ fontSize: '12px' }}>{plant.deviceSNInfo.fwVersion}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Device Model: </td>
                                                    <td style={{ fontSize: '12px' }}>{plant.deviceSNInfo.deviceModel}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Dialog>
                                    <DeviceCardContent>UserName: {currentPlant.login}</DeviceCardContent>
                                    <DeviceCardContent>Password: {currentPlant.password}</DeviceCardContent>
                                </DeviceCardContainer>
                                <DeviceCardContainer>
                                    <DeviceCardContent>Status: {plant.deviceSN.status === '1' ? <span style={{ color: 'green' }}>Online</span> : plant.deviceSN.status === '0' ? <span style={{ color: 'blue' }}>Sleeping</span> : <span style={{ color: 'red' }}>Offline</span>}</DeviceCardContent>
                                    <DeviceCardContent>Plant Name: {plant.deviceSN.plantName}</DeviceCardContent>
                                </DeviceCardContainer>
                                <DeviceCardContainer>
                                    <DeviceCardContent>Update Time: {plant.deviceSN.lastUpdateTime}</DeviceCardContent>
                                    <DeviceCardContent>Data Logger: {plant.deviceSN.datalogSn} <InfoDeviceIconContainer onClick={handleOpenDataloggerDialog}><FaQuestion /></InfoDeviceIconContainer></DeviceCardContent>
                                </DeviceCardContainer>
                                <Dialog
                                    open={openDataloggerDialog}
                                    onClose={handleCloseDataloggerDialog}
                                >
                                    <table style={{ margin: '5px' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Signal: </td>
                                                <td style={{ fontSize: '12px' }}>{plant.datalogSNInfo.simSignal}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Collector model: </td>
                                                <td style={{ fontSize: '12px' }}>{plant.datalogSNInfo.deviceType}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Firmware Version: </td>
                                                <td style={{ fontSize: '12px' }}>{plant.datalogSNInfo.firmwareVersion}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Ip & Port: </td>
                                                <td style={{ fontSize: '12px' }}>{plant.datalogSNInfo.ipAndPort}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '5px' }}>Data Update Interval: </td>
                                                <td style={{ fontSize: '12px' }}>{plant.datalogSNInfo.interval} minute</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Dialog>
                                <DeviceCardContainer>
                                    <DeviceCardContent>Rated Power: {currentPlant.inverter === 'growatt' ? (parseFloat(plant.deviceSN.nominalPower) / 1000).toFixed(2) : plant.deviceSN.nominalPower} kWp</DeviceCardContent>
                                    <DeviceCardContent>Current Power: {(parseFloat(plant.deviceSN.pac) / 1000).toFixed(2)} kWp</DeviceCardContent>
                                </DeviceCardContainer>
                                <DeviceCardContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'cen' }}>
                                    <GenerateReportIconContainer onClick={() => {
                                        setType('graph');
                                        setChartLoading(true);
                                        setTimeout(() => {
                                            htmlToImage.toPng(document.getElementById('barChart'))
                                                .then((dataUrl) => {
                                                    let url = dataUrl;
                                                    navigate(`/downloadPdf/${clientId}/${id}/${encodeURIComponent(url)}`);
                                                });
                                        }, 7000);
                                    }}>
                                        <FaFilePdf />
                                    </GenerateReportIconContainer>
                                    <DeviceCardContent>Download Relatório da Planta Solar</DeviceCardContent>
                                </DeviceCardContainer>
                            </DeviceCards>
                        </Device>
                    </SolarPlantDetailContainer>
                )
            }
        </div>
    )
}

export default SolarPlantDetailPage;