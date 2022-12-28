import styled from 'styled-components';
import { colors } from '../cores';

export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || colors.light1};
    padding: 45px 55px;
    overflow-y: auto;
    position: absolute;
    margin-left:40%;
`;

export const StyledTitle = styled.h2`
    font-size: ${(props)=>props.size}px;
    text-align: center;
    color: ${(props)=> props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom: 20px;
`;

export const Logo = styled.div`
    width: 130px;
    height: 130px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
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
    background-color: transparent;
    font-size: 16px;
    border: 3px solid ${colors.dark1};
    border-radius: 25px;
    color: ${colors.dark1};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.primary};
        cursor: pointer;
    }
`;
