import { forwardRef, useState } from 'react';
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
    StyledSelectContainer,
    SearchContainer,
    SearchIcon,
    SearchInput,
    FormTextInput,
    DatePickerContainer,
    PaginationContainer,
    PaginationButton,
    StyledInputMask
} from './style.js';
import { FaSearch } from 'react-icons/fa';

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
            label: 'Growatt',
            value: 'growatt',
        },
        {
            label: 'Canadian',
            value: 'canadian',
        },
        {
            label: 'Deye',
            value: 'deye',
        }
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

export const ContractDateInput = ({ handleChange, initialValue, ...props }) => {
    const [date, setDate] = useState(initialValue);
    const [meta] = useField();

    const handleChangeSelected = (e) => {
        setDate(e);
        handleChange(e);
    }

    return (
        <DatePickerContainer>
            <DatePicker
                selected={date}
                onChange={handleChangeSelected}
                dateFormat='dd/MM/yyyy'
            />
            {
                meta.touched && meta.error ? (
                    <ErrorMsg>{meta.error}</ErrorMsg>
                ) : (
                    <ErrorMsg style={{ visibility: "hidden" }}>.</ErrorMsg>
                )
            }
        </DatePickerContainer>
    )

}

export const SearchBar = ({ search, setSearch }) => (
    <SearchContainer>
        <SearchIcon>
            <FaSearch />
        </SearchIcon>
        <SearchInput
            type='text'
            placeholder='Pesquisar...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </SearchContainer>
);

export const FormInput = ({ ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <FormTextInput
                {...field}
                {...props}
            />
            {
                meta.touched && meta.error ? (
                    <ErrorMsg>{meta.error}</ErrorMsg>
                ) : (
                    <ErrorMsg style={{ visibility: 'hidden' }}>.</ErrorMsg>
                )
            }
        </>
    )
}

export const Pagination = ({ totalPages, currentPage, setPage }) => (
    <PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => (
            <PaginationButton
                key={index}
                onClick={() => setPage(index + 1)}
                disabled={currentPage === index + 1}
            >
                {index + 1}
            </PaginationButton>
        ))}
    </PaginationContainer>
);

export const MaskedInput = forwardRef(({ mask, ...props }, ref) => {
    const [field, meta, helpers] = useField(props);
    return (
        <>
            <StyledInputMask
                {...field}
                {...props}
                mask={mask}
                ref={ref}
                onChange={(event) => {
                    helpers.setValue(event.target.value);
                }}
                value={props.value}
            />
            {
                meta.touched && meta.error ? (
                    <ErrorMsg>{meta.error}</ErrorMsg>
                ) : (
                    <ErrorMsg style={{ visibility: 'hidden' }}>.</ErrorMsg>
                )
            }
        </>
    )
});