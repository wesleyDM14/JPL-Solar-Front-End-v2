import styled from "styled-components";
import { colors } from "../globalStyles";
import { FormTextInput } from "../FormLib/style";
import { FormInput } from "../FormLib";

export const ContractContainer = styled.div`
    padding: 20px 35px;
`;

export const ContractHeader = styled.div`
    display: grid;
    grid-template-columns: 7fr 3fr;
    margin-bottom: 35px;
`;

export const ContractTitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const IconTitleContainer = styled.div`
    margin-right: 20px;
    font-size: 30px;
    color: #a5aaa5;
`;

export const ContractTitle = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const RegisterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const IconRegisterContainer = styled.div`
    margin-right: 10px;
    font-size: 20px;
    color: #34a806;
    cursor: pointer;
`;

export const RegisterTitle = styled.h2`
    font-size: 14px;
    color: #2e4a66;
`;

export const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const ContractListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContractListHeader = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr;
    height: 40px;
    width: 100%;
    align-items: center;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: ${colors.primary};
    box-shadow: 5px 5px 13px #EDEDED, -5px -5px 13px #FFF;
`;

export const ListLabel = styled.h5`
    font-size: 14px;
    color: #2e4a66;
    margin-left: 10px;
`;

export const SingleContract = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr;
    height: 50px;
    width: 100%;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
`;

export const ContractSingleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const StyledLabel = styled.h1`
    font-size: 18px;
    color: ${colors.lightblue};
    margin-right: 10px;
    margin-left: 10px;
`;

export const ContractValue = styled.a`
    font-size: 14px;
    font-weight: 700;
    margin-right: 30px;
    text-decoration: none;
    color: ${colors.dark1};

    @media (max-width: 1380px) {
        font-weight: 300;
    }
`;

export const AdminContractContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const EditIcon = styled.div`
    font-size: 18px;
    margin-left: 10px;
    color: ${colors.lightblue};
`;

export const DeleteIcon = styled.div`
    font-size: 18px;
    margin-left: 10px;
    color: ${colors.red};
`;

export const ContentContractContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`;

export const ContentContratoHeader = styled.div`
    background-color: ${colors.primary};
    display: flex;
    border-radius: 5px;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const SearcherContainer = styled.div`

`;

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
`;

export const ProgressBarContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin: 20px 0;
    width: 100%;
    justify-content: space-between;
`;

export const Step = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
    text-align: center;
`;

export const StepNumber = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? 'green' : '#ccc')};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    position: relative;
    z-index: 2;
`;

export const Line = styled.div`
  height: 2px;
  background-color: ${(props) => (props.active ? 'green' : '#ccc')};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  width: ${(props) => props.width};
  left: ${(props) => props.left};
`;

export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || colors.light1};
    padding: 45px 55px;
    overflow-y: auto;
    width: 100%;
`;

export const StyledTitle = styled.h2`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom: 20px;
`;

export const StyledFormContent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 15px;
`;

export const StyledFormColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${(props) => props.espacamento ? props.espacamento : 0}px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 25px;
`;

export const SubmmitButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: ${colors.theme};
    font-size: 16px;
    border: 3px solid ${colors.light2};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.dark1};
        color: ${colors.primary};
        cursor: pointer;
    }
`;

export const NextButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: ${colors.theme};
    font-size: 16px;
    border: 3px solid ${colors.light2};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.dark1};
        color: ${colors.primary};
        cursor: pointer;
    }
`;

export const BackButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: ${colors.theme};
    font-size: 16px;
    border: 3px solid ${colors.light2};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.dark1};
        color: ${colors.primary};
        cursor: pointer;
    }
`;

export const FormInputArea = styled.div`
    box-sizing: inherit;
    margin-bottom: 20px;
`;

export const FormInputLabelRequired = styled.p`
    font-weight: 600;
    margin-bottom: 5px;

    &::after{
        display: inline-block;
        content: "*";
        margin-left: 2px;
        color: ${colors.red};
    }
`;

export const SubItensContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
    }
`;

export const SubItensPlus = styled.div`
    display: grid;
    grid-template-columns: 0.2fr 0.3fr 0.5fr;

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
    }
`;

export const Limitador = styled.div`
    max-width: 90%;

    @media only screen and (max-width: 978px){
        max-width: 100%;
    }
`;

export const NumLimitador = styled.div`
    max-width: 80%;

    @media only screen and (max-width: 978px){
        max-width: 100%;
    }
`;

export const StyleDatePickerInput = styled(FormTextInput)`
    background-color: #f0f0f0; // Adjust background color as needed
    height: 2.5em;  // Adjust height if needed
    width: 100%;
    padding: 0.75em;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
`;

export const FormSelect = styled.select`
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
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;

    &::-ms-expand {
        display: none;
    }
`;

export const SelectWrapper = styled.div`
    position: relative;
    width: 100%;

    &:after {
        content: '▼';
        font-size: 12px;
        color: #363636;
        position: absolute;
        left: 80%;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }
`;

export const FormInputError = styled(FormInput)`
    border-color: #F00;
`;
