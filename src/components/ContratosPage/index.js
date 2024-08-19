import { useState, useEffect } from "react";
import {
    ContractContainer,
    ContractHeader,
    ContractTitleContainer,
    ContractTitle,
    IconTitleContainer,
    RegisterContainer,
    IconRegisterContainer,
    RegisterTitle,
    LoadingContainer,
    ContentContractContainer,
    ContentContratoHeader,
} from './style.js';
import { ThreeDots } from "react-loader-spinner";
import { FaFileAlt, FaPlusCircle } from "react-icons/fa";
import { colors } from "../globalStyles.js";
import ContractList from "./contractList.js";
import { SearchBar } from "../FormLib/index.js";
import ContractModal from "./newContractModal.js";
import { getContracts } from "../../auth/actions/contractActions.js";

const ContratosPage = ({ user, navigate }) => {

    const [contratos, setContratos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        async function loadDataContracts() {
            if (loading) {
                await getContracts(setContratos, setLoading);
            }
        }
        loadDataContracts();
    }, [loading]);

    return (
        <ContractContainer>
            <ContractHeader>
                <ContractTitleContainer>
                    <IconTitleContainer>
                        <FaFileAlt />
                    </IconTitleContainer>
                    <ContractTitle>Contratos</ContractTitle>
                </ContractTitleContainer>
                <RegisterContainer onClick={openModal}>
                    <IconRegisterContainer>
                        <FaPlusCircle />
                    </IconRegisterContainer>
                    <RegisterTitle>Adicionar</RegisterTitle>
                </RegisterContainer>
            </ContractHeader>
            <ContentContractContainer>
                <ContentContratoHeader>
                    <SearchBar search={search} setSearch={setSearch} />
                </ContentContratoHeader>
                {
                    loading ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={colors.dark3}
                                height={80}
                                width={300}
                            />
                        </LoadingContainer>
                    ) : (
                        <ContractList
                            contracts={contratos}
                            setLoading={setLoading}
                            user={user}
                            search={search}
                            page={page}
                            setPage={setPage}
                            itemsPerPage={itemsPerPage}
                        />
                    )
                }
            </ContentContractContainer>
            <ContractModal onClose={closeModal} isOpen={isModalOpen} setLoading={setLoading} />
        </ContractContainer>
    )
}
export default ContratosPage;