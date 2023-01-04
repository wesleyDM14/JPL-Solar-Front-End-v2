import styled from 'styled-components';
import { colors } from '../globalStyles.js';

export const Container = styled.div`
    position: relative;
`;

export const StyledLabel = styled.p`
    text-align: left;
    font-size: 13px;
    font-weight: bold;
`;

export const StyledTextInput = styled.input`
    width: ${(props) => props.width}px;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: ${colors.dark1};
    background-color: ${colors.light2};
    border: 0;
    outline: 0;
    display: block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    ${(props) => props.invalid && `background-color: ${colors.red}; color: ${colors.primary};`}

    &:focus {
        background-color: ${colors.dark2};
        color: ${colors.primary};
    }
`;

export const ErrorMsg = styled.div`
    font-size: 11px;
    color: ${colors.red};
    margin-top: -5px;
    margin-bottom: 10px;
    text-align: left;
`;

export const StyledIcon = styled.p`
    color: ${colors.dark1};
    position: absolute;
    font-size: 21px;
    top: 35px;
    ${(props) => props.right && `right: 15px;`};
    ${(props) => !props.right && `left: 15px;`};
`;

export const StyledSelect = styled.select`
    width: 100%;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: #1F2937;
    background-color: #E5E7EB;
    text-decoration: none;
    text-align: left;
    transition: ease-in-out 0.3s;
    outline: 0;
    border-radius: 5px;
    margin: 5px auto 25px auto;
`;

export const StyledSelectContainer = styled.div`
    position: relative;
`;