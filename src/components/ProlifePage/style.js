import LogoImg from '../../assets/jpl_logo.png';
import styled from 'styled-components';

export const ImgLogo = styled.div`
    background-image: url(${LogoImg});
    background-size: cover;
    background-position: center;
    margin: auto;
    width: 300px;
    height: 300px;
`;

export const Container = styled.div`
    background-color: #fff;
    min-height: 100vh;
    padding: 20px;
`;
export const TitleContainer = styled.div`
    text-align: center;
`;
export const Title = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
    margin-top: 55px
`;

export const SubTitle = styled.h2`
    font-size: 14px;
    color: #2e4a66;
`;