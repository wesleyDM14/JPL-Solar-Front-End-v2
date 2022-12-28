import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { ThreeDots } from 'react-loader-spinner';
import { FiMail, FiLock } from 'react-icons/fi';

import { loginUser } from '../../auth/actions/userActions.js';

import {
    StyledFormArea,
    Logo,
    StyledTitle,
    ButtonGroup,
    StyledFormButton,
} from './style.js';
import { TextInput } from '../FormLib';
import { colors } from '../cores.js';
import logo from '../../assets/logo.png';

const LoginForm = ({ loginUser }) => {
    const navigate = useNavigate();
    return (
        <div style={{
            backgroundColor: '#F3F4F6',
            minHeight: '98vh',
        }}>
            <StyledFormArea>
                <Logo image={logo} />
                <StyledTitle color={colors.theme} size={30}>Login no Sistema</StyledTitle>
                <Formik
                    initialValues={{
                        login: "",
                        password: "",
                    }}
                    validationSchema={
                        Yup.object({
                            login: Yup.string().required("Required"),
                            password: Yup.string().min(6, "Password is to short").max(30, "Password is to long").required("Required"),
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError})=>{
                        loginUser(values, navigate, setFieldError, setSubmitting);
                    }}
                >
                    {
                        ({ isSubmitting }) => (
                            <Form>
                                <TextInput
                                    name='login'
                                    type='text'
                                    label='Login'
                                    placeholder='Digite seu login...'
                                    icon={<FiMail />}
                                    width={200}
                                />
                                <TextInput
                                    name="password"
                                    type="password"
                                    label="Senha"
                                    placeholder="********"
                                    icon={<FiLock />}
                                    width={200}
                                />
                                <ButtonGroup>
                                    {
                                        !isSubmitting && (
                                            <StyledFormButton type='submit'>
                                                Login
                                            </StyledFormButton>
                                        )
                                    }
                                    {
                                        isSubmitting && (
                                            <ThreeDots
                                                color={colors.theme}
                                                height={49}
                                                width={100}
                                            />
                                        )
                                    }
                                </ButtonGroup>
                            </Form>
                        )
                    }
                </Formik>
            </StyledFormArea>
        </div>
    )
}

export default connect(null, {loginUser})(LoginForm);