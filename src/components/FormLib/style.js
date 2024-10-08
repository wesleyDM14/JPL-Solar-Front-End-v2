import styled from 'styled-components';
import { colors } from '../globalStyles.js';
import ReactInputMask from 'react-input-mask';

export const StyledInputMask = styled(ReactInputMask)`
    max-width: 100%;
    width: 90%;
    background-color: #fff;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    align-items: center;
    border: 1px solid #0a0a0a0d;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: flex-start;
    padding-bottom: calc(.5em - 1px);
    padding-left: calc(.75em - 1px);
    padding-right: calc(.75em - 1px);
    padding-top: calc(.5em - 1px);
    line-height: 1.5;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

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

export const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 15px;
`;

export const SearchIcon = styled.div`
    margin: auto;
    color: ${colors.dark1};
    position: absolute;
    font-size: 25px;
    top: 40%;
    left: 15px;
`;

export const SearchInput = styled.input`
    width: 90%;
    margin-top: 15px;
    padding: 15px;
    padding-left: 50px;
`;

export const FormTextInput = styled.input`
    max-width: 100%;
    width: 90%;
    background-color: #fff;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    align-items: center;
    border: 1px solid #0a0a0a0d;
    border-radius: 4px;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: flex-start;
    padding-bottom: calc(.5em - 1px);
    padding-left: calc(.75em - 1px);
    padding-right: calc(.75em - 1px);
    padding-top: calc(.5em - 1px);
    line-height: 1.5;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const DatePickerContainer = styled.div`
    max-width: 100%;
    width: 90%;
    background-color: #fff;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    align-items: center;
    border: 1px solid #0a0a0a0d;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: flex-start;
    padding-bottom: calc(.5em - 1px);
    padding-left: calc(.75em - 1px);
    padding-right: calc(.75em - 1px);
    padding-top: calc(.5em - 1px);
    line-height: 1.5;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const PaginationButton = styled.button`
    background-color: #FFF;
    border: 1px solid #ddd;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:disabled{
        background-color: #ddd;
        cursor: not-allowed;
    }
`;