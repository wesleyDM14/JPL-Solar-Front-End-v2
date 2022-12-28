import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../cores";

export const NavbarContainer = styled.div`
    background: ${colors.primary};
    grid-area: nav;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 30px;
    border-bottom: 1px solid lightgray;
`;

export const LeftContainer = styled.div`
    display: flex;
`;

export const RightContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NavbarIten = styled(Link)`
    margin-right: 30px;
    text-decoration: none;
    color: #a5aaad;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
`;

export const NavbarShowIcon = styled.div`
    display: none;
    @media only screen and (max-width: 978px) {
        display: inline;
    }

    @media only screen and (max-width: 480px) {
        display: none;
    }
`;

export const NavbarAvatar = styled.div`
    width: 30px;
    height: 30px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
`;