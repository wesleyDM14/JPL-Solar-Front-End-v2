import axios from "axios";
import { BASE_URL } from "./baseurl";
import { getAllClient, } from "./clientActions";

export const registerSolarPlant = async (solarPlant, setFieldError, setSubmitting, closeModal, setLoading) => {
    await axios.post(BASE_URL + "api/clients/plants/register", solarPlant,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then((response) => {
        console.log(response);
        const { data } = response;
        if (data.status === "FAILED") {
            const { message } = data;
            setFieldError("login", message);
            setSubmitting(false);
        } else if (data.status === "SUCESS") {
            setSubmitting(false);
            setLoading(true);
            closeModal();
        }
    }).catch(err => console.error(err));
}

export const getSolarPlantsByClientId = async ({ id, setSolarPlants, setLoading }) => {
    let clientId = id;
    await axios.get(BASE_URL + `api/clients/plants/plants/${clientId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then((response) => {
        const data = response.data;
        setSolarPlants(data.data);
        setLoading(false);
    }).catch(err => console.error(err));
}

export const updateSolarPlant = async (solarPlant, setFieldError, setSubmitting, setLoading, closeModal) => {
    await axios.put(BASE_URL + 'api/clients/plants/update', solarPlant, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const { data } = response;
        if (data.status === 'FAILED') {
            const { message } = data;
            setFieldError('login', message);
            setSubmitting(false);
        } else if (data.status === 'SUCESS') {
            setSubmitting(false);
            setLoading(true);
            closeModal();
        }
    }).catch(err => console.error(err));
}

export const deletePlantById = async (solarPlant, setLoading) => {
    await axios.post(BASE_URL + 'api/clients/plants/delete',
        {
            data: {
                id: solarPlant.id,
            }

        }, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then(() => {
        setLoading(true);
    }).catch(err => console.error(err));
}

export const getPlantById = async ({ id, setPlant, setLoading, setCurrentPlant }) => {
    if (id === undefined) {
        return;
    } else {
        await axios.get(BASE_URL + `api/clients/plants/plant/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            let plant = response.data.data;
            setCurrentPlant(plant);
            await axios.get(BASE_URL + `api/clients/plants/params/${encodeURIComponent(plant.login)}/${encodeURIComponent(plant.password)}/${plant.inverter}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            ).then((response) => {
                console.log(response)
                setPlant(response.data.data);
                setLoading(false);
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }
}

export const getSolarPlantChartByType = async ({ currentPlant, date, type, plant, setPowerData, setChartLoading }) => {
    if (type === 'year' || type === 'mouth') {
        let temp = date.getFullYear();
        date = temp;
    } else if (type === 'day') {
        let temp = date.getFullYear() + '-' + (date.getMonth() + 1);
        date = temp;
    } else {
        let temp = date.toISOString().slice(0, 10);
        date = temp;
    }
    await axios.post(BASE_URL + 'api/clients/plants/params/getChartByType',
        {
            data: {
                login: currentPlant.login,
                password: currentPlant.password,
                date: date,
                type: type,
                plantId: plant.plantData.id,
                deviceTypeName: plant.deviceSN.deviceTypeName,
                deviceSN: plant.deviceSN.alias,
                inverter: currentPlant.inverter
            }

        }, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then((response) => {
        if (type === 'time') {
            if (plant.deviceSN.deviceTypeName === 'max') {
                setPowerData(response.data.data.chart.pac);
            } else if (plant.deviceSN.deviceTypeName === 'tlx') {
                setPowerData(response.data.data.chart.charts.ppv);
            }
        } else {
            if (plant.deviceSN.deviceTypeName === 'max') {
                setPowerData(response.data.data.chart.energy);
            } else if (plant.deviceSN.deviceTypeName === 'tlx') {
                setPowerData(response.data.data.chart.charts.energy);
            }
        }
        setChartLoading(false);
    }).catch(err => console.error(err));
}

export const getErrorListSolarPlant = async ({ currentPlant, errorDate, plant, setErrorList, setErrorLoading }) => {
    let date = errorDate.getFullYear();

    await axios.post(BASE_URL + 'api/clients/plants/params/getErrorLogByYear',
        {
            data: {
                login: currentPlant.login,
                password: currentPlant.password,
                date: date,
                plantId: plant.plantData.id,
                inverter: currentPlant.inverter
            }
        }, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then((response) => {
        setErrorList(response.data.data.errorLog);
        setErrorLoading(false);
    }).catch(err => console.error(err));
}

export const getTotalData = async ({ setLoading, setNumUsinas, setPowerInstaled }) => {
    await axios.get(BASE_URL + 'api/clients/plants/dashboardData', {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        setNumUsinas(response.data.totalPlant);
        setPowerInstaled(response.data.totalPowerInstalled);
        setLoading(false);
    }).catch(err => console.error(err));
}

const getAllPlantForClient = async (clientId) => {
    let plants = [];
    await axios.get(BASE_URL + `api/clients/plants/plants/${clientId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then((response) => {
        plants = response.data.data;
    }).catch(err => console.error(err));
    return plants;
}

export const getAllSolarPlant = async ({ setPlantsLoading, setSolarPlants, setSolarPlantsWithError }) => {
    let plantsResponse = [];
    let plantsErrorResponse = [];
    let clients = await getAllClient();
    for (let i = 0; i < clients.length; i++) {
        var solarPlants = await getAllPlantForClient(clients[i].id);
        for (let j = 0; j < solarPlants.length; j++) {
            let plantTemp = solarPlants[j];
            
            await axios.get(BASE_URL + `api/clients/plants/dashboard/solarPlants/status/${encodeURIComponent(solarPlants[j].login)}/${encodeURIComponent(solarPlants[j].password)}/${solarPlants[j].inverter}/${clients[i].name}/${solarPlants[j].code}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            ).then((response) => {
                let temp = response.data;
                temp.plantId = plantTemp.id;
                temp.clientId = clients[i].id;
                if (response.data.status === '1') {
                    plantsResponse.push(temp);
                } else {
                    plantsErrorResponse.push(temp);
                }
            }).catch(err => console.error(err));
        }
    }
    setSolarPlants(plantsResponse);
    setSolarPlantsWithError(plantsErrorResponse);
    setPlantsLoading(false);
}