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
    ).then((response)=>{
        const data = response;
        setSolarPlants(data.data);
        setLoading(false);
    }).catch(err => console.error(err));
}