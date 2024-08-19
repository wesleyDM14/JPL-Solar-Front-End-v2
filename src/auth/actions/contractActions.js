import axios from "axios";
import { BASE_URL } from "./baseurl";
import { saveAs } from "file-saver";

export const registerContract = async (contract, setFieldError, setSubmitting, closeModal, setLoading, setStep) => {
    await axios.post(BASE_URL + 'api/contratos/contratos', contract,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        const { data } = response;
        console.log(data);
        setSubmitting(false);
        closeModal();
        setStep(1);
        setLoading(true);
    }).catch(err => {
        console.error(err);
        setSubmitting(false);
        setFieldError('priceTotal', err.message);
    });
}

export const getContracts = async (setContracts, setLoading) => {
    await axios.get(BASE_URL + 'api/contratos/contratos',
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        const { data } = response;
        setContracts(data);
        setLoading(false);
    }).catch(err => {
        console.error(err);
        setLoading(false);
    });
}

export const downloadContractPdf = async (contractId, setDownloading) => {
    await axios.get(BASE_URL + `api/contratos/generate-contrato/${contractId}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'arraybuffer'
        }
    ).then((response) => {
        const { data } = response;
        const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, 'contrato.pdf');
        setDownloading(false);
    }).catch(err => {
        console.error(err);
        setDownloading(false);
    });
}

export const downloadPromissoriaPdf = async (contractId, setDownloading) => {
    await axios.get(BASE_URL + `api/contratos/generate-promissoria/${contractId}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'arraybuffer'
        }
    ).then((response) => {
        const { data } = response;
        const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, 'promissoria.pdf');
        setDownloading(false);
    }).catch(err => {
        console.error(err);
        setDownloading(false);
    });
}

export const deleteContract = async (contractId, setLoading, closeDeleteModal, setDeleting) => {
    await axios.delete(BASE_URL + `api/contratos/contratos/${contractId}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        const { data } = response;
        window.alert(data.message);
        closeDeleteModal();
        setDeleting(false);
        setLoading(true);
    }).catch(err => {
        console.error(err);
        setDeleting(false);
    });
}