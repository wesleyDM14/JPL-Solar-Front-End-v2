import styled from 'styled-components';
import { Link } from "react-router-dom";

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #f3f4f6;
    margin-bottom: 30px;
`;

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.div`
    width: 55px;
    height: 55px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
`;

export const Title = styled.h1`
    font-size: 18px;
    display: inline;
    margin-left: 15px;
`;

export const MenuContainer = styled.div`
    display:flex ;
    flex-direction: column;
`;

export const CloseContainer = styled.div`
    font-size: 18px;
    display: none;
    @media only screen and (max-width: 978px) {
        display: inline;
    }
`;

export const IconContainer = styled.div`
    margin-right: 10px;
    font-size: 18px;
`;

export const MenuTitleSection = styled.h2`
    color: #3ea175;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 5px;
    padding: 0 10px;
    font-weight: 700;
`;

export const MenuItemContainer = styled.div`
    color: #f3f4f6;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const MenuItemTitle = styled(Link)`
    text-decoration: none;
    color: #a5aaad;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    &:focus{
        padding: 7px;
        background: rgba(62, 161, 117, 0.3);
        width: 100%;
        border-radius: 3px;
    }
`;

export const LogoultContainer = styled.div`
    margin-top: 20px;
    padding: 10px;
    color: #e65061;
    display: flex;
    flex-direction: row;
    cursor: pointer;
`;

export const Logoult = styled.a`
    text-decoration: none;
    color: #e65061;
    font-weight: 700;
    text-transform: uppercase;
`;