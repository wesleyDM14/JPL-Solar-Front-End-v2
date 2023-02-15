import axios from "axios";

export const getClientsByUserLogedIn = async ({ user, setLoading }) => {
    let userId = 1;
    let clients = [];
    await axios.get(`http://localhost:3333/api/clients/clients/${userId}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then((response) => {
        const data = response.data.data;
        clients = data;
    }).catch(err => console.error(err));
    setLoading(false);
    return clients;
}

export const getClientById = async ({clientId, setClient}) => {
    let client = {}
    await axios.get(`http://localhost:3333/api/clients/client/${clientId}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then((response) => {
        const data = response.data.data;
        client = data;
    }).catch(err => console.error(err));
    setClient(client);
}

export const registerClient = async (client, setFieldError, setSubmitting, closeModal, setLoading) => {
    await axios.post('http://localhost:3333/api/clients/register', client,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response)=>{
        const { data } = response;
        if(data.status === 'FAILED'){
            const { message } = data;
            setFieldError('name', message);
            setSubmitting(false);
        }else if (data.status === 'SUCESS'){
            setSubmitting(false);
            setLoading(true);
            closeModal();
        }
    }).catch(err => console.error(err));
}

export const deleteClientById = async (user, client, setLoading) => {
    await axios.post('http://localhost:3333/api/clients/delete',
        {
            data: {
                id: client.id,
                fixerId: user.id,
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

export const updateClient = async (client, setFieldError, setSubmitting, closeModal, setLoading) => {
    await axios.put("http://localhost:3333/api/clients/update", client, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        const {data} = response;
        if (data.status === "FAILED") {
            const { message } = data;
            setFieldError("name", message);
            setSubmitting(false);
        } else if (data.status === "SUCESS") {
            setSubmitting(false);
            setLoading(true);
            closeModal();
        }
    }).catch(err => console.error(err));
}