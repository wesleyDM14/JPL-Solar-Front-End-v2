import { useMemo, useState } from "react";
import Modal from "react-modal";
import {
    AdminContractContainer,
    ContractListContainer,
    ContractListHeader,
    ContractSingleContainer,
    ContractValue,
    DeleteIcon,
    EditIcon,
    ListLabel,
    SingleContract,
    StyledLabel,
} from "./style";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import { Pagination } from "../FormLib";
import { deleteContract, downloadContractPdf, downloadPromissoriaPdf } from "../../auth/actions/contractActions";
import { modalStyles } from "../globalStyles";
import { CancelButton, ConfirmButton, DeleteButtonContainer, DeleteContainer, DeleteTitle } from "../ClientsPage/style";
import { ThreeDots } from "react-loader-spinner";

const ContractList = ({ contracts, user, setLoading, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [selectedContract, setSelectedContract] = useState({});
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [modalDownloadIsOpen, setModalDownloadIsOpen] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const openDeleteModal = () => setModalDeleteIsOpen(true);

    const closeDeleteModal = () => setModalDeleteIsOpen(false);

    const openDownloadModal = () => setModalDownloadIsOpen(true);

    const closeDownloadModal = () => {
        setSelectedContract({});
        setModalDownloadIsOpen(false);
    };

    const filteredContratos = useMemo(() => {
        return contracts.filter(contrato =>
            contrato.nome.toLowerCase().includes(search.toLowerCase())
        );
    }, [contracts, search]);

    const totalPages = Math.ceil(filteredContratos.length / itemsPerPage);
    const currentPageItems = filteredContratos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <ContractListContainer>
            <ContractListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel>Opções</ListLabel>
            </ContractListHeader>
            {
                currentPageItems.map((contract) => (
                    <SingleContract
                        key={contract.id}
                    >
                        <ContractSingleContainer>
                            <StyledLabel>Nome: </StyledLabel>
                            <ContractValue>{contract.nome}</ContractValue>
                        </ContractSingleContainer>
                        <AdminContractContainer>
                            <EditIcon onClick={() => {
                                setSelectedContract(contract);
                                openDownloadModal();
                            }}>
                                <FaDownload />
                            </EditIcon>
                            <DeleteIcon onClick={() => {
                                setSelectedContract(contract);
                                openDeleteModal();
                            }}>
                                <FaTrashAlt />
                            </DeleteIcon>
                        </AdminContractContainer>
                    </SingleContract>
                ))
            }
            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Quer realmente excluir {selectedContract.nome}?</DeleteTitle>
                    <DeleteButtonContainer>
                        <CancelButton onClick={
                            () => {
                                setSelectedContract({});
                                closeDeleteModal();
                            }
                        }>Cancelar</CancelButton>
                        {
                            deleting && (
                                <ThreeDots />
                            )
                        }
                        {
                            !deleting && (
                                <ConfirmButton onClick={
                                    async () => {
                                        setDeleting(true);
                                        await deleteContract(selectedContract.id, setLoading, closeDeleteModal, setDeleting);
                                    }
                                }>Confirmar</ConfirmButton>
                            )
                        }
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
            <Modal
                isOpen={modalDownloadIsOpen}
                onRequestClose={closeDownloadModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteButtonContainer>
                        {
                            downloading && (
                                <ThreeDots />
                            )
                        }
                        {
                            !downloading && (
                                <ConfirmButton onClick={
                                    async () => {
                                        setDownloading(true);
                                        await downloadPromissoriaPdf(selectedContract.id, setDownloading);
                                    }
                                }>
                                    <FaDownload style={{marginRight: '5px'}}/>
                                    Promissoria
                                </ConfirmButton>
                            )
                        }
                        {
                            downloading && (
                                <ThreeDots />
                            )
                        }
                        {
                            !downloading && (
                                <ConfirmButton onClick={
                                    async () => {
                                        setDownloading(true);
                                        await downloadContractPdf(selectedContract.id, setDownloading);
                                    }
                                }>
                                    <FaDownload style={{marginRight: '5px'}}/>
                                    Contrato
                                </ConfirmButton>
                            )
                        }
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
        </ContractListContainer>
    )
}

export default ContractList;