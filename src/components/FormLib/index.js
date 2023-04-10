import { useState } from 'react';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FiEye, FiEyeOff } from 'react-icons/fi';

import {
    Container,
    StyledLabel,
    StyledTextInput,
    StyledIcon,
    ErrorMsg,
    StyledSelect,
    StyledSelectContainer
} from './style.js';

export const TextInput = ({ icon, ...props }) => {
    const [field, meta] = useField(props);
    const [show, setShow] = useState(false);

    return (
        <Container>
            <StyledLabel htmlfor={props.name}>
                {props.label}
            </StyledLabel>
            {
                props.type !== 'password' &&
                <StyledTextInput
                    {...field}
                    {...props}
                />
            }
            {
                props.type === 'password' && (
                    <StyledTextInput
                        {...field}
                        {...props}
                        type={show ? 'text' : 'password'}
                    />
                )
            }
            <StyledIcon>{icon}</StyledIcon>
            {
                props.type === 'password' &&
                <StyledIcon onClick={() => setShow(!show)} right>
                    {show && <FiEye />}
                    {!show && <FiEyeOff />}
                </StyledIcon>
            }
            {
                meta.touched && meta.error ? (
                    <ErrorMsg>{meta.error}</ErrorMsg>
                ) : (
                    <ErrorMsg style={{ visibility: "hidden" }}>.</ErrorMsg>
                )
            }
        </Container>
    )
}

export const SelectInput = ({ icon, handleChange, initialValue, ...props }) => {
    const [selectedInverter, setSelectedInverter] = useState(initialValue);

    const handleChangeSelected = (e) => {
        setSelectedInverter(e.target.value);
        handleChange(e.target.value);
    }

    const options = [
        {
            label: "ABB",
            value: 'abb',
        },
        {
            label: 'Sungrow',
            value: 'sungrow',
        },
        {
            label: 'Growatt',
            value: 'growatt',
        },
        {
            label: 'Canadian',
            value: 'canadian',
        },
        {
            label: 'Solis',
            value: 'solis',
        },
        {
            label: 'Deye',
            value: 'deye',
        },
        {
            label: 'Refusol',
            value: 'refusol',
        },
        {
            label: 'Fronius',
            value: 'fronius'
        },
    ]

    return (
        <StyledSelectContainer>
            <StyledLabel htmlfor={props.name}>
                {props.label}
            </StyledLabel>
            <StyledSelect
                onChange={handleChangeSelected}
                value={selectedInverter}
            >
                {
                    options.map((e) => (
                        <option key={e.value} value={e.value}>{e.label}</option>
                    ))
                }
            </StyledSelect>
            <StyledIcon>{icon}</StyledIcon>
        </StyledSelectContainer>
    )
}

export const DateInput = ({ icon, handleChange, initialValue, ...props }) => {
    const [date, setDate] = useState(initialValue);
    const [meta] = useField(props);

    const handleChangeSelected = (e) => {
        setDate(e);
        handleChange(e);
    }

    return (
        <Container>
            <StyledLabel htmlfor={props.name}>
                {props.label}
            </StyledLabel>
            <DatePicker
                selected={date}
                onChange={handleChangeSelected}
                dateFormat='dd/MM/yyyy'
            />
            <StyledIcon>{icon}</StyledIcon>
            {
                meta.touched && meta.error ? (
                    <ErrorMsg>{meta.error}</ErrorMsg>
                ) : (
                    <ErrorMsg style={{ visibility: "hidden" }}>.</ErrorMsg>
                )
            }
        </Container>
    )
}