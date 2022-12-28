import { useState } from 'react';
import { useField } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import {
    Container,
    StyledLabel,
    StyledTextInput,
    StyledIcon,
    ErrorMsg
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