import axios from "axios";

export const registerSolarPlant = async (solarPlant, setFieldError, setSubmitting, closeModal, setLoading) => {
    await axios.post("http://localhost:3333/api/clients/plants/register", solarPlant,
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
    await axios.get(`http://localhost:3333/api/clients/plants/plants/${clientId}`, {
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
    await axios.put('http://localhost:3333/api/clients/plants/update', solarPlant, {
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
    await axios.post('http://localhost:3333/api/clients/plants/delete',
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

export const getPlantById = async ({ id, setPlant, setLoading }) => {
    if (id === undefined) {
        return;
    } else {
        await axios.get(`http://localhost:3333/api/clients/plants/plant/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            let plant = response.data.data;
            await axios.post(`http://localhost:3333/api/growatt/status`, {
                data: {
                    user: plant.login,
                    password: plant.password,
                }
            }
                , {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then((response) => {
                setPlant(response.data);
                setLoading(false);
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }
}