import styled from 'styled-components';
import { colors } from '../globalStyles';

export const SolarPlantsContainer = styled.div`
    padding: 20px 30px;
`;

export const SolarPlantsHeader = styled.div`
    display: grid;
    grid-template-columns: 7fr 3fr;
    margin-bottom: 15px;
`;

export const SolarPlantsTitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const IconTitleContainer = styled.div`
    margin-right: 20px;
    font-size: 30px;
    color: #a5aaa5;
`;

export const SolarPlantsTitle = styled.h1`
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

export const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const SolarPlantsCards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
`;

export const SingleSolarPlant = styled.div`
    display: grid;
    grid-template-columns: 3fr 6fr 1fr;
    margin-top: 20px;
    padding: 15px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
    cursor: pointer;
    align-items: center;
`;

export const IconSolarPlantContainer = styled.div`
    font-size: 80px;
    align-self: center;
    color: #2e4a66;
`;

export const SolarPlantsInfo = styled.div`
    display: inline-block;
    align-items: center;
    justify-content: space-between;
`;

export const InfoTitle = styled.h2`
    margin-top: 10px;
    font-size: 18px;
    color: #2e4a66;
`;

export const InfoValue = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: #272736;
`;

export const SolarPlantsOperations = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const IconOperation = styled.div`
    color: yellow;
    margin-bottom: 25px;
    font-size: 30px;
`;

export const SolarPlantsAdmin = styled.div`
    display: inline-flex;
    margin: 20px 0;
`;

export const IconEdit = styled.div`
    margin-left: 8px;
    font-size: 20px;
    color: lightblue;
`;

export const IconDelete = styled.div`
    margin-left: 8px;
    font-size: 20px;
    color: red;
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