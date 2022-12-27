import styled from "styled-components";
import { Link } from "react-router-dom";

import LogoImg from '../../assets/logo.png';
import { colors } from "../cores";

export const Container = styled.div`
    top: 0;
    right: 0;
    width: 100%;
    background: ${colors.light1};
    display: grid;
    grid-template-columns: 0.3fr 0.7fr;
    padding: 5px;
    position: fixed;
    z-index: 99;
`;

export const Logo = styled.div`
    background-image: url(${LogoImg});
    background-size: cover;
    width: 70px;
    height: 70px;
    margin-left: 20px;
`;

export const MenuContainer = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 0px 15px;
`;

export const LoginButton = styled(Link)`
    width: 150px;
    height: 30px;
    background-color: ${colors.theme};
    font-size: 18px;
    border: 3px solid ${colors.dark1};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration: none;
    justify-content: center;
    align-items: center;
    transition: ease-in-out 0.3s;
    outline: 0;
    display: flex;

    &:hover{
        background-color: ${colors.dark1};
        color: ${colors.light2};
        cursor: pointer;
    }
`;