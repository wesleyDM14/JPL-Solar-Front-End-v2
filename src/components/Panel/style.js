import styled from 'styled-components';
import LogoImg from '../../assets/logo.png';
import { colors } from "../globalStyles.js";

export const MainContainer = styled.div`
    padding: 20px 35px;
    align-items: center;
    justify-content: center;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const LogoImage = styled.div`
    background-image: url(${LogoImg});
    background-size: cover;
    width: 100px;
    height: 100px;
`;

export const GreetingContainer = styled.div`
    padding: 10px;
`;

export const GreetingTitle = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const GreetingSubTitle = styled.p`
    font-size: 14px;
    font-weight: 700;
    color: #a5aaad;
`;

export const MainCards = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin: 20px 0;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 70px;
    padding: 25px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const CardIconContainer1 = styled.div`
    font-size: 35px;
    color: ${colors.lightblue};
    text-align: center;
`;

export const CardTitle = styled.div``;

export const CardInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TextPrimaty = styled.p`
    color: #a5aaad;
    font-size: 18px;
`;

export const TextCardTitle = styled.span`
    font-size: 25px;
    font-weight: bold;
`;

export const CardIconContainer2 = styled.div`
    font-size: 35px;
    color: #00ff00;
    text-align: center;
`;

export const TitleCardsPanelContainer = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    margin-top: 25px;
`;

export const TitleCardsPanelContent = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const CardsMainPanel = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin: 20px 0;
`;

export const CardPanel = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    flex-direction: column;
    justify-content: space-around;
    height: 70px;
    padding: 25px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
    cursor: pointer;
    @media (max-width: 1380px) {
     min-height: 80px;
    }
`;

export const CardPanelStatusActive = styled.div`
    font-size: 35px;
    color: rgb(0, 255, 0);
    animation: pulse 0.7s infinite;
    animation-direction: alternate;
    -webkit-animation-name: pulse;
    animation-name: pulse;
    text-align: center;
    align-self: center;

    @-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale(1);
      -webkit-filter: brightness(100%);
    }
    100% {
      -webkit-transform: scale(1.2);
      -webkit-filter: brightness(200%);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      filter: brightness(100%);
    }
    100% {
      transform: scale(1.2);
      filter: brightness(200%);
    }
  }

  @media (max-width: 1380px) {
    font-size: 25px;
  }

`;

export const CardPanelStatusError = styled.div`
    font-size: 35px;
    color: rgb(255, 0, 0);
    animation: pulse 0.7s infinite;
    animation-direction: alternate;
    -webkit-animation-name: pulse;
    animation-name: pulse;
    text-align: center;
    align-self: center;

    @-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale(1);
      -webkit-filter: brightness(100%);
    }
    100% {
      -webkit-transform: scale(1.2);
      -webkit-filter: brightness(200%);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      filter: brightness(100%);
    }
    100% {
      transform: scale(1.2);
      filter: brightness(200%);
    }
  }
  @media (max-width: 1380px) {
    font-size: 25px;
  }
`;

export const CardPanelInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export const CardPanelTitle = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    @media (max-width: 1380px) {
      font-size: 16px;
    }
`;

export const CardPanelName = styled.span`
    color: #a5aaad;
    font-size: 14px;
    @media (max-width: 1380px) {
      font-size: 12px;
    }
`;

export const CardPanelProdution = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CardPanelEnergy = styled.div`
    font-size: 25px;
    color: #00ff0066;
    text-align: center;
    @media (max-width: 1380px) {
      font-size: 20px;
    }
`;

export const EnergyContent = styled.p`
    font-size: 16px;
    font-weight: bold;
    @media (max-width: 1380px) {
      font-size: 14px;
    }
`;