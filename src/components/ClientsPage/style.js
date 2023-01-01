import styled from "styled-components";
import { colors } from '../globalStyles.js';

export const ClientsContainer = styled.div`
    padding: 20px 35px;
`;

export const ClientsHeader = styled.div`
    display: grid;
    grid-template-columns: 7fr 3fr;
    margin-bottom: 35px;
`;

export const ClientsTitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const IconTitleContainer = styled.div`
    margin-right: 20px;
    font-size: 30px;
    color: #a5aaa5;
`;

export const ClientsTitle = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const RegisterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const IconRegisterContainer = styled.div`
    margin-right: 10px;
    font-size: 20px;
    color: #34a806;
    cursor: pointer;
`;

export const RegisterTitle = styled.h2`
    font-size: 14px;
    color: #2e4a66;
`;

export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || colors.light1};
    padding: 45px 55px;
    overflow-y: auto;
`;

export const StyledTitle = styled.h2`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 25px;
`;

export const StyledFormButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: ${colors.theme};
    font-size: 16px;
    border: 3px solid ${colors.light2};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.dark1};
        color: ${colors.primary};
        cursor: pointer;
    }
`;

export const ClientListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ClientListHeader = styled.div`
    display: grid;
    grid-template-columns: 6fr 3fr 1fr;
    height: 40px;
    width: 100%;
    align-items: center;
    padding: 15px;
    border-radius: 5px;
    background-color: ${colors.primary};
    box-shadow: 5px 5px 13px #EDEDED, -5px -5px 13px #FFF;
`;

export const ListLabel = styled.h5`
    font-size: 14px;
    color: #2e4a66;
    margin-right: 10px;
`;

export const SingleClient = styled.div`
    display: grid;
    grid-template-columns: 6fr 3fr 1fr;
    height: 40px;
    width: 100%;
    align-items: center;
    padding: 15px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
    cursor: pointer;
`;

export const ClientSingleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const StyledLabel = styled.h1`
    font-size: 18px;
    color: ${colors.lightblue};
    margin-right: 10px;
`;

export const ClientValue = styled.p`
    font-size: 14px;
    font-weight: 700;
    margin-right: 30px;
`;

export const AdminClientContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const EditIcon = styled.div`
    font-size: 18px;
    margin-left: 10px;
    color: ${colors.lightblue};
`;

export const DeleteIcon = styled.div`
    font-size: 18px;
    margin-left: 10px;
    color: ${colors.red};
`;

export const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const DeleteContainer = styled.div`
    align-items: center;
    justify-content: center;
    padding: 30px;
`;

export const DeleteTitle = styled.h1`
    font-size: 20px;
    color: #2e4a66;
`;

export const DeleteButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
`;

export const CancelButton = styled.button`
    padding: 10px;
    width: 100px;
    background-color: red;
    font-size: 16px;
    font-weight: 700;
    color: white;
    border: 0;
    border-radius: 15px;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        cursor: pointer;
        background-color: black;
    }
`;

export const ConfirmButton = styled.button`
    padding: 10px;
    width: 100px;
    background-color: lightgreen;
    font-size: 16px;
    font-weight: 700;
    color: white;
    border: 0;
    border-radius: 15px;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        cursor: pointer;
        background-color: black;
    }
`;