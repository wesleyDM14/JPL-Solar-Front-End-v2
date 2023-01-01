import styled from "styled-components";
import { colors } from "../globalStyles.js";
import MockupBackground from '../../assets/mockup.png';

export const Container = styled.div`
    margin-top: 80px;
    background-color: ${colors.primary};
    display: grid;
    grid-template-columns: 0.6fr 0.4fr;

    @media only screen and (max-width: 768px){
        display: flex;
        flex-direction: column;
    }
`;

export const Mockup = styled.div`
    background-image: url(${MockupBackground});
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 20px;
    min-height: 300px;
    margin-top: 15px;
    display: flex;

    @media only screen and (max-width: 768px){
        min-height: 300px;
        background-size: contain;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 50px;
`;

export const Title = styled.h1`
    font-size: 43px;
    text-align: center;
    color: ${colors.theme};
    padding: 5px;
    margin-bottom: 20px;
`;

export const SubTitle = styled.h2`
    font-size: 20px;
    text-align: center;
`;