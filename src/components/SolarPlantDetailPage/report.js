import { useEffect, useState } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Image,
    Font
} from '@react-pdf/renderer';
import LogoImg from '../../assets/jpl_logo.png';
import GreenSquare from '../../assets/green square.png';
import BlueSquare from '../../assets/blue square.png';
import { useParams } from 'react-router-dom';
import { getClientById } from "../../auth/actions/clientActions";
import { getPlantById } from "../../auth/actions/solarPlantsActions";
import { LoadingContainer } from "./style";
import { ThreeDots } from "react-loader-spinner";
import { colors } from "../globalStyles";

Font.register({
    family: 'Open Sans',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 700 }
    ]
});

const styles = StyleSheet.create({
    page: {
        paddingTop: '5px',
        paddingBottom: '65px',
        paddingHorizontal: '35px',
    },
    viewer: {
        width: '100%',
        minHeight: "98vh",
    },
    image: {
        width: '80px',
        marginHorizontal: '43%',
        marginVertical: 15,
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    line: {
        border: '1px solid black',
        borderRadius: '1px',
        marginBottom: '5px'
    },
    headerReport: {
        flexDirection: 'row',
    },
    identfyClient: {
        marginRight: '100px',
        marginTop: '10px',
        marginLeft: '5px'
    },
    clientInner: {
        flexDirection: 'row',
        marginBottom: '3px',
        alignItems: 'center'
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Open Sans'
    },
    normalText: {
        fontSize: '11px',
        alignSelf: 'center'
    },
    identfyPlant: {
        marginTop: '10px'
    },
    line2: {
        border: '1px dotted black',
        borderRadius: '1px',
        marginTop: '5px',
        marginBottom: '15px'
    },
    chart: {
        width: '80%',
        marginVertical: 15,
    },
    footer: {
        position: 'absolute',
        fontSize: 10,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    bodyText: {
        textAlign: 'center',
        marginTop: '15px',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legend: {
        fontSize: '14px',
    }
});

function MyDocument() {

    const { clientId, id, url } = useParams();
    const [plant, setPlant] = useState({});
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPlant, setCurrentPlant] = useState({});

    useEffect(() => {
        async function loadPlantData() {
            if (loading) {
                await getClientById({ clientId, setClient });
                await getPlantById({ id, setPlant, setLoading, setCurrentPlant });
            }
        }
        loadPlantData();
    }, [loading, clientId, id]);

    return (
        <div>
            {
                loading ? (
                    <LoadingContainer>
                        <ThreeDots
                            color={colors.dark3}
                            height={80}
                            width={350}
                        />
                    </LoadingContainer>
                ) : (
                    <PDFViewer style={styles.viewer}>
                        <Document>
                            <Page size='A4' style={styles.page}>
                                <View fixed style={styles.header}>
                                    <Image
                                        src={LogoImg}
                                        style={styles.image}
                                    />
                                    <hr style={styles.line} />
                                    <Text>Relatório de Produção - Usina Solar</Text>
                                </View>
                                <View style={styles.headerReport}>
                                    <View style={styles.identfyClient}>
                                        <View style={styles.clientInner}>
                                            <Text style={styles.textBold}>Nome: </Text>
                                            <Text style={styles.normalText}>{client.name}</Text>
                                        </View>
                                        <View style={styles.clientInner}>
                                            <Text style={styles.textBold}>Cidade: </Text>
                                            <Text style={styles.normalText}>{client.address}</Text>
                                        </View>
                                        <View style={styles.clientInner}>
                                            <Text style={styles.textBold}>Telefone: </Text>
                                            <Text style={styles.normalText}>{client.contact}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.identfyPlant}>
                                        <View style={styles.clientInner}>
                                            <Text style={styles.textBold}>Codigo Planta Solar: </Text>
                                            <Text style={styles.normalText}>{currentPlant.code}</Text>
                                        </View>
                                        <View style={styles.clientInner}>
                                            <Text style={styles.textBold}>Local de Instalação: </Text>
                                            <Text style={styles.normalText}>{currentPlant.local}</Text>
                                        </View>
                                        <View style={styles.clientInner}>
                                            <Text style={styles.textBold}>Inversor: </Text>
                                            <Text style={styles.normalText}>{(currentPlant.inverter).charAt(0).toUpperCase() + (currentPlant.inverter).slice(1)}</Text>
                                        </View>
                                        <View style={styles.clientInner}>
                                            <Text style={styles.textBold}>Nº de Painéis Solares: </Text>
                                            <Text style={styles.normalText}>{currentPlant.numberPanel}</Text>
                                        </View>
                                        <View style={styles.clientInner}>
                                            <Text style={styles.textBold}>Potência Instalada: </Text>
                                            <Text style={styles.normalText}>{currentPlant.installedPower} kWp</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <hr style={styles.line2}></hr>
                                </View>
                                <View style={styles.bodyText}>
                                    <Text style={styles.textBold}>Geração Estimada X Real ao Longo do Ano ({new Date().getFullYear()}) em KWh</Text>
                                </View>
                                <View style={styles.body}>
                                    <Image src={url} style={styles.chart} />
                                    <Text style={styles.legend}>
                                        Data: {new Date().toLocaleDateString() + `\n`}
                                        <Image
                                            src={GreenSquare}
                                        />Real {`\n`}
                                        <Image
                                            src={BlueSquare}
                                        />Estimada {`\n`}
                                    </Text>
                                </View>
                                <View>
                                    <hr style={styles.line2}></hr>
                                </View>
                                <View>
                                    <Text style={styles.normalText}>
                                        Produção no dia Atual ({new Date().getDate()}): {parseFloat(plant.totalData.eToday) > 1000 ? (parseFloat(plant.totalData.eToday) / 1000).toFixed(2) + `MWh\n`: parseFloat(plant.totalData.eToday).toFixed(2) + `KWh\n`}
                                        {`\n`}
                                        Produção no Mês Atual ({new Date().getMonth() + 1}): {parseFloat(plant.totalData.eMonth) > 1000 ? (parseFloat(plant.totalData.eMonth) / 1000).toFixed(2) + `MWh\n`: parseFloat(plant.totalData.eMonth).toFixed(2) + `KWh\n`}
                                        {`\n`}
                                        Produção Total Atual: {parseFloat(plant.totalData.eTotal) > 1000 ? (parseFloat(plant.totalData.eTotal) / 1000).toFixed(2) + `MWh\n`: parseFloat(plant.totalData.eTotal).toFixed(2) + `KWh\n`}

                                    </Text>
                                </View>
                                <Text style={styles.footer} fixed>
                                    JPL ENGENHARIA LTDA - CNPJ: 33.651.180/0001-09{`\n`}
                                    R. Nicola Tesla, 189, Maria Manoela, São Miguel-RN, CEP 59.920-000{`\n`}
                                    Telefone: (84) 9 9813-3818 / (83) 9 9615-1895 / (84) 9 9930-0037{`\n`}
                                    jpl_engenharia@hotmail.com
                                </Text>
                            </Page>
                        </Document>
                    </PDFViewer>
                )
            }
        </div >
    );
}

export default MyDocument;