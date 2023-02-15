import styled from "styled-components";

export const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const SolarPlantDetailContainer = styled.div`
    background: #f3f4f6;
    overflow-y: auto;
    padding: 20px 35px;
`;

export const Header = styled.div`
    display: grid;
    grid-template-columns: 7fr 3fr;
    margin-bottom: 15px;
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
`;

export const TitleIconContainer = styled.div`
    font-size: 50px;
    margin-right: 20px;
`;

export const Greeting = styled.div``;

export const TitleContent = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const TitleDescription = styled.p`
    font-size: 14px;
    font-weight: 700;
    color:#a5aaad ;
`;

export const InfoHome = styled.div`
    display: grid;
    grid-template-columns: 1fr 7fr;
    align-items: center;
    height: auto;
    padding: 15px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const InfoHomeIconContainer = styled.div`
    font-size: 30px;
    margin-right: 15px;
    color: #2e4a66;
`;

export const InfoHomeCard = styled.div`
    display: inline-block;
    align-items: center;
    justify-content: space-between;
`;

export const InfoHomeTitle = styled.h1`
    font-size: 18px;
    color: #2e4a66;
`;

export const InfoHomeDetail = styled.p`
    font-size: 12px;
    color: #2e4a66;
    font-weight: 700;
`;

export const MainCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin: 20px 0;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 70px;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const BoltIconContainer = styled.div`
    justify-content: center;
    margin-bottom: 5px;
    color: #0f8;
    font-size: 30px;
    margin-right: 30px;
`;

export const CardInner = styled.div`
    display: inline;
    text-align: center;
`;

export const CardInnertitle = styled.h1``;

export const CardInnerContentContainer = styled.div`
    flex-direction: column;
`;

export const CardInnerContent = styled.span`
    font-size: 18px;
    margin-right: 5px;
`;

export const ChartsCards = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-top: 50px;
`;

export const ChartsLeft = styled.div`
    padding: 25px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const ChartsLeftTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ChartsLeftTitleContainer = styled.div``;

export const ChartsLeftTitleContent = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const ChartsLeftIconContainer = styled.div`
    color: #fff;
    font-size: 20px;
    background: #ffc100;
    border-radius: 200px 0px 200px 200px;
    -moz-border-radius: 200px 0px 200px 200px;
    -webkit-border-radius: 200px 0px 200px 200px;
    border: 0px solid #000;
    padding: 15px;
`;