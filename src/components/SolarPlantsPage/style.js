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