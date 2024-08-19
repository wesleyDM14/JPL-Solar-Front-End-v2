import React, { useState } from "react";
import Modal from "react-modal";
import {
    BackButton,
    ButtonGroup,
    FormInputArea,
    FormInputError,
    FormInputLabelRequired,
    FormSelect,
    Limitador,
    Line,
    ModalContainer,
    NextButton,
    NumLimitador,
    ProgressBarContainer,
    SelectWrapper,
    Step,
    StepNumber,
    StyledFormArea,
    StyledFormColumn,
    StyledFormContent,
    StyledTitle,
    SubItensContainer,
    SubItensPlus,
    SubmmitButton,
} from "./style";
import { colors } from "../globalStyles";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { FormInput, MaskedInput } from "../FormLib";
import DatePicker from "react-date-picker";
import 'react-datepicker/dist/react-datepicker.css';
import { ThreeDots } from "react-loader-spinner";
import { registerContract } from "../../auth/actions/contractActions";

const ContractModal = ({ isOpen, onClose, setLoading }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [step, setStep] = useState(1);
    const [touchedFields, setTouchedFields] = useState(new Set());

    const validationSchemaPersonal = Yup.object({
        nome: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email().required('Obrigatório'),
        profissao: Yup.string().required('Profissão é obrigatório'),
        estadoCivil: Yup.string().required('Estado Civil é obrigatório'),
        dataNascimento: Yup.date().required('Data de nascimento é obrigatório'),
        cpf: Yup.string().required('CPF é obrigatório'),
        rg: Yup.string().required('RG é obrigatório'),
        logradouro: Yup.string().required('Rua é obrigatório'),
        numero: Yup.number().required('Numero é obrigatório'),
        bairro: Yup.string().required('Bairro é obrigatório'),
        cidade: Yup.string().required('Cidade é obrigatório'),
        uf: Yup.string().required('UF é obrigatório').length(2, 'UF deve ter 2 caracteres'),
        cep: Yup.string().required('CEP é obrigatório'),
    });

    const validationSchemaTecnical = Yup.object({
        modeloModulos: Yup.string().required('Modelo é obrigatório.'),
        modeloInversor: Yup.string().required('Modelo é obrigatório.'),
        potModulos: Yup.number().required('Potencia do Modulo Obrigatória.'),
        potInversor: Yup.number().required('Potencia do Inversor Obrigatória.'),
    });

    const validationSchemaFinanceiro = Yup.object({
        dataContrato: Yup.date().required('Data de Contrato é obrigatório.'),
        carencia: Yup.number().required('Carência é Obrigatório.'),
        dataPrimeiraParcela: Yup.date().required('Data da primeira parcela é obrigatório.'),
        quantParcelas: Yup.number().required('Quantidade de parcelas é Obrigatório.'),
        priceTotal: Yup.number().required('Preço total é Obrigatório.'),
        priceParcela: Yup.number().required('Preço da parcela é Obrigatório.'),
        avalista: Yup.boolean(),
        nomeAvalista: Yup.string().when('avalista', {
            is: true,  // Se avalista for true
            then: Yup.string().required('Nome do avalista é obrigatório'),
            otherwise: Yup.string().notRequired(),
        }),
        profissaoAvalista: Yup.string().when('avalista', {
            is: true,
            then: Yup.string().required('Profissão do avalista é obrigatória'),
            otherwise: Yup.string().notRequired(),
        }),
        cpfAvalista: Yup.string().when('avalista', {
            is: true,
            then: Yup.string()
                .required('CPF do avalista é obrigatório'),
            otherwise: Yup.string().notRequired(),
        }),
        logradouroAvalista: Yup.string().when('avalista', {
            is: true,
            then: Yup.string().required('Logradouro do avalista é obrigatório'),
            otherwise: Yup.string().notRequired(),
        }),
        numeroAvalista: Yup.number().when('avalista', {
            is: true,
            then: Yup.number().required('Número é obrigatório').min(1, 'Número deve ser maior que zero'),
            otherwise: Yup.number().notRequired(),
        }),
        bairroAvalista: Yup.string().when('avalista', {
            is: true,
            then: Yup.string().required('Bairro do avalista é obrigatório'),
            otherwise: Yup.string().notRequired(),
        }),
        cidadeAvalista: Yup.string().when('avalista', {
            is: true,
            then: Yup.string().required('Cidade do avalista é obrigatória'),
            otherwise: Yup.string().notRequired(),
        }),
        ufAvalista: Yup.string().when('avalista', {
            is: true,
            then: Yup.string()
                .required('UF do avalista é obrigatória')
                .length(2, 'UF deve ter 2 caracteres'),
            otherwise: Yup.string().notRequired(),
        }),
        cepAvalista: Yup.string().when('avalista', {
            is: true,
            then: Yup.string()
                .required('CEP do avalista é obrigatório'),
            otherwise: Yup.string().notRequired(),
        }),
    });

    const validationSchemas = [
        validationSchemaPersonal,
        validationSchemaTecnical,
        validationSchemaFinanceiro
    ];

    const initialValues = {
        nome: '',
        email: '',
        profissao: '',
        estadoCivil: '',
        dataNascimento: null,
        cpf: '',
        rg: '',
        logradouro: '',
        numero: 0,
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        modeloModulos: '',
        modeloInversor: '',
        potModulos: 0,
        potInversor: 0,
        dataContrato: null,
        carencia: 0,
        dataPrimeiraParcela: null,
        quantParcelas: 0,
        priceTotal: 0,
        priceParcela: 0,
        avalista: false,
        nomeAvalista: '',
        profissaoAvalista: '',
        cpfAvalista: '',
        logradouroAvalista: '',
        numeroAvalista: 0,
        bairroAvalista: '',
        cidadeAvalista: '',
        ufAvalista: '',
        cepAvalista: '',
    };

    const handleNext = (validateForm, setTouchedFields) => {
        validateForm().then(errors => {
            if (Object.keys(errors).length === 0) {
                setStep(step + 1);
            } else {
                setTouchedFields(new Set(Object.keys(errors)));
            }
        });
    };

    const ProgressBarElement = ({ currentStep, totalSteps }) => {
        const stepWidth = 100 / (totalSteps - 1); // Percentage width of each step
        const circleSize = 30; // Diameter of the circle

        // Helper function to calculate line width
        const getLineWidth = (index) => {
            return index < totalSteps - 1 ? `calc(${stepWidth}% - ${circleSize / 2}px)` : '0';
        };

        // Helper function to calculate line position
        const getLineLeft = (index) => {
            return `calc(${stepWidth}% * ${index} + ${circleSize / 2}px)`;
        };

        return (
            <ProgressBarContainer>
                {[...Array(totalSteps).keys()].map(index => (
                    <React.Fragment key={index}>
                        {index < totalSteps - 1 && (
                            <Line
                                active={index < currentStep - 1}
                                width={getLineWidth(index)}
                                left={getLineLeft(index)}
                            />
                        )}
                        <Step>
                            <StepNumber active={index < currentStep}>
                                {index + 1}
                            </StepNumber>
                        </Step>
                    </React.Fragment>
                ))}
            </ProgressBarContainer>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Contract Modal"
            ariaHideApp={false}
            style={{
                content: {
                    justifyContent: 'center'
                }
            }}
        >
            <ModalContainer>
                <ProgressBarElement currentStep={step} totalSteps={3} />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemas[step - 1]}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        if (step === 3) {
                            await registerContract(values, setFieldError, setSubmitting, onClose, setLoading, setStep);
                        }
                    }}
                >
                    {
                        ({ setFieldValue, isSubmitting, validateForm, values, errors, touched, setTouched }) => (
                            <Form>
                                <StyledFormArea>
                                    <StyledTitle color={colors.dark1} size={20}>
                                        {step === 1 && "Dados Pessoais"}
                                        {step === 2 && "Dados Técnicos"}
                                        {step === 3 && "Dados Financeiros"}
                                    </StyledTitle>
                                    {
                                        step === 1 && (
                                            <>
                                                <StyledFormContent>
                                                    <StyledFormColumn>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Nome</FormInputLabelRequired>
                                                            <Field
                                                                as={touchedFields.has('nome') && errors.nome ? FormInputError : FormInput}
                                                                name='nome'
                                                                onFocus={
                                                                    () => {
                                                                        const newTouchedFields = new Set(touchedFields);
                                                                        newTouchedFields.delete('nome');
                                                                        setTouchedFields(newTouchedFields);
                                                                    }
                                                                }
                                                            />
                                                        </FormInputArea>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>CPF</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <MaskedInput
                                                                        name='cpf'
                                                                        mask='999.999.999-99'
                                                                        maskChar={null}
                                                                        value={values.cpf}
                                                                        type='text'
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>RG</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <MaskedInput
                                                                        name='rg'
                                                                        mask='999.999.999'
                                                                        maskChar={null}
                                                                        value={values.rg}
                                                                        type='text'
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Profissão</FormInputLabelRequired>
                                                            <Field
                                                                as={touchedFields.has('profissao') && errors.profissao ? FormInputError : FormInput}
                                                                name='profissao'
                                                                onFocus={
                                                                    () => {
                                                                        const newTouchedFields = new Set(touchedFields);
                                                                        newTouchedFields.delete('profissao');
                                                                        setTouchedFields(newTouchedFields);
                                                                    }
                                                                }
                                                            />
                                                        </FormInputArea>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Data de Nascimento</FormInputLabelRequired>
                                                                <DatePicker
                                                                    value={values.dataNascimento}
                                                                    onChange={(date) => {
                                                                        setFieldValue('dataNascimento', date);
                                                                    }}
                                                                    dateFormat='dd/MM/yyyy'
                                                                />
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Estado Civil</FormInputLabelRequired>
                                                                <SelectWrapper>
                                                                    <Field as={FormSelect} name='estadoCivil'>
                                                                        <option value=''>Selecione o estado civil</option>
                                                                        <option value='SOLTEIRO'>Solteiro(a)</option>
                                                                        <option value='CASADO'>Casado(a)</option>
                                                                        <option value='SEPARADO'>Separado(a)</option>
                                                                        <option value='DIVORCIADO'>Divorciado(a)</option>
                                                                        <option value='VIUVO'>Viúvo(a)</option>
                                                                    </Field>
                                                                </SelectWrapper>
                                                                <ErrorMessage name="estadoCivil" component='div' />
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                    </StyledFormColumn>
                                                    <StyledFormColumn espacamento={5}>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Email</FormInputLabelRequired>
                                                            <Field
                                                                as={touchedFields.has('email') && errors.email ? FormInputError : FormInput}
                                                                name='email'
                                                                onFocus={
                                                                    () => {
                                                                        const newTouchedFields = new Set(touchedFields);
                                                                        newTouchedFields.delete('email');
                                                                        setTouchedFields(newTouchedFields);
                                                                    }
                                                                }
                                                            />
                                                        </FormInputArea>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Logradouro</FormInputLabelRequired>
                                                            <Field
                                                                as={touchedFields.has('logradouro') && errors.logradouro ? FormInputError : FormInput}
                                                                name='logradouro'
                                                                onFocus={
                                                                    () => {
                                                                        const newTouchedFields = new Set(touchedFields);
                                                                        newTouchedFields.delete('logradouro');
                                                                        setTouchedFields(newTouchedFields);
                                                                    }
                                                                }
                                                            />
                                                        </FormInputArea>
                                                        <SubItensPlus>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Numero</FormInputLabelRequired>
                                                                <NumLimitador>
                                                                    <Field
                                                                        as={touchedFields.has('numero') && errors.numero ? FormInputError : FormInput}
                                                                        type='number'
                                                                        name='numero'
                                                                        step='1'
                                                                        min='0'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('numero');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </NumLimitador>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>CEP</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <MaskedInput
                                                                        name='cep'
                                                                        mask='99.999-999'
                                                                        maskChar={null}
                                                                        value={values.cep}
                                                                        type='text'
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Bairro</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('bairro') && errors.bairro ? FormInputError : FormInput}
                                                                        name='bairro'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('bairro');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                        </SubItensPlus>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>UF</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('uf') && errors.uf ? FormInputError : FormInput}
                                                                        name='uf'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('uf');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Cidade</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('cidade') && errors.cidade ? FormInputError : FormInput}
                                                                        name='cidade'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('cidade');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                    </StyledFormColumn>
                                                </StyledFormContent>
                                            </>
                                        )
                                    }
                                    {
                                        step === 2 && (
                                            <>
                                                <StyledFormContent>
                                                    <StyledFormColumn>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Modelo Módulos</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('modeloModulos') && errors.modeloModulos ? FormInputError : FormInput}
                                                                        name='modeloModulos'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('modeloModulos');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Potência dos Mdódulos</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('potModulos') && errors.potModulos ? FormInputError : FormInput}
                                                                        type='number'
                                                                        name='potModulos'
                                                                        step='0.01'
                                                                        min='0'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('potModulos');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                    </StyledFormColumn>
                                                    <StyledFormColumn espacamento={5}>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Modelo Inversor</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('modeloInversor') && errors.modeloInversor ? FormInputError : FormInput}
                                                                        name='modeloInversor'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('modeloInversor');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Potência do Inversor</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('potInversor') && errors.potInversor ? FormInputError : FormInput}
                                                                        type='number'
                                                                        name='potInversor'
                                                                        step='0.01'
                                                                        min='0'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('potInversor');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                    </StyledFormColumn>
                                                </StyledFormContent>
                                            </>
                                        )
                                    }
                                    {
                                        step === 3 && (
                                            <>
                                                <StyledFormContent>
                                                    <StyledFormColumn>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Data do Contrato</FormInputLabelRequired>
                                                                <DatePicker
                                                                    value={values.dataContrato}
                                                                    onChange={(date) => {
                                                                        setFieldValue('dataContrato', date);
                                                                    }}
                                                                    dateFormat='dd/MM/yyyy'
                                                                />
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Data Primira Parcela</FormInputLabelRequired>
                                                                <DatePicker
                                                                    value={values.dataPrimeiraParcela}
                                                                    onChange={(date) => {
                                                                        setFieldValue('dataPrimeiraParcela', date);
                                                                    }}
                                                                    dateFormat='dd/MM/yyyy'
                                                                />
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Carência (em Dias)</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('carencia') && errors.carencia ? FormInputError : FormInput}
                                                                        type='number'
                                                                        name='carencia'
                                                                        step='1'
                                                                        min='0'
                                                                        onBlur={() => {
                                                                            const carencia = values.carencia;

                                                                            if (!values.dataPrimeiraParcela && values.dataContrato && carencia >= 0) {
                                                                                const dataContrato = new Date(values.dataContrato);
                                                                                const dataPrimeiraParcela = new Date(dataContrato);
                                                                                dataPrimeiraParcela.setDate(dataContrato.getDate() + carencia);
                                                                                setFieldValue('dataPrimeiraParcela', dataPrimeiraParcela);
                                                                            }
                                                                        }}
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('carencia');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Quantidade Parcelas</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('quantParcelas') && errors.quantParcelas ? FormInputError : FormInput}
                                                                        type='number'
                                                                        name='quantParcelas'
                                                                        step='1'
                                                                        min='0'
                                                                        onBlur={() => {
                                                                            const quantParcelas = values.quantParcelas;
                                                                            const priceTotal = values.priceTotal;
                                                                            if (quantParcelas > 0 && priceTotal > 0) {
                                                                                const priceParcela = priceTotal / quantParcelas;
                                                                                setFieldValue('priceParcela', parseFloat(priceParcela.toFixed(2)));
                                                                            }
                                                                        }}
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('quantParcelas');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Preço Total (R$)</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('priceTotal') && errors.priceTotal ? FormInputError : FormInput}
                                                                        type='number'
                                                                        name='priceTotal'
                                                                        step='0.01'
                                                                        min='0'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('priceTotal');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Preço Parcelas (R$)</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <Field
                                                                        as={touchedFields.has('priceParcela') && errors.priceParcela ? FormInputError : FormInput}
                                                                        type='number'
                                                                        name='priceParcela'
                                                                        step='0.01'
                                                                        min='0'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('priceParcela');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                        <FormInputArea>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'flex-start'
                                                            }}>
                                                                <Field
                                                                    type='checkbox'
                                                                    name='avalista'
                                                                    id='avalista'
                                                                    style={{
                                                                        marginRight: '10px',
                                                                    }}
                                                                />
                                                                <FormInputLabelRequired htmlFor='avalista'>IncluirAvalista?</FormInputLabelRequired>
                                                            </div>
                                                        </FormInputArea>
                                                    </StyledFormColumn>
                                                    {
                                                        values.avalista && (
                                                            <StyledFormColumn espacamento={5}>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Nome Avalista</FormInputLabelRequired>
                                                                    <Field
                                                                        as={touchedFields.has('nomeAvalista') && errors.nomeAvalista ? FormInputError : FormInput}
                                                                        name='nomeAvalista'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('nomeAvalista');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </FormInputArea>
                                                                <SubItensContainer>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>CPF</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <MaskedInput
                                                                                name='cpfAvalista'
                                                                                mask='999.999.999-99'
                                                                                maskChar={null}
                                                                                value={values.cpfAvalista}
                                                                                type='text'
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Profissão Avalista</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <Field
                                                                                as={touchedFields.has('profissaoAvalista') && errors.profissaoAvalista ? FormInputError : FormInput}
                                                                                name='profissaoAvalista'
                                                                                onFocus={
                                                                                    () => {
                                                                                        const newTouchedFields = new Set(touchedFields);
                                                                                        newTouchedFields.delete('profissaoAvalista');
                                                                                        setTouchedFields(newTouchedFields);
                                                                                    }
                                                                                }
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                </SubItensContainer>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Endereço Avalista</FormInputLabelRequired>
                                                                    <Field
                                                                        as={touchedFields.has('logradouroAvalista') && errors.logradouroAvalista ? FormInputError : FormInput}
                                                                        name='logradouroAvalista'
                                                                        onFocus={
                                                                            () => {
                                                                                const newTouchedFields = new Set(touchedFields);
                                                                                newTouchedFields.delete('logradouroAvalista');
                                                                                setTouchedFields(newTouchedFields);
                                                                            }
                                                                        }
                                                                    />
                                                                </FormInputArea>
                                                                <SubItensPlus>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Numero</FormInputLabelRequired>
                                                                        <NumLimitador>
                                                                            <Field
                                                                                as={touchedFields.has('numeroAvalista') && errors.numeroAvalista ? FormInputError : FormInput}
                                                                                type='number'
                                                                                name='numeroAvalista'
                                                                                step='1'
                                                                                min='0'
                                                                                onFocus={
                                                                                    () => {
                                                                                        const newTouchedFields = new Set(touchedFields);
                                                                                        newTouchedFields.delete('numeroAvalista');
                                                                                        setTouchedFields(newTouchedFields);
                                                                                    }
                                                                                }
                                                                            />
                                                                        </NumLimitador>
                                                                    </FormInputArea>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>CEP</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <MaskedInput
                                                                                name='cepAvalista'
                                                                                mask='99.999-999'
                                                                                maskChar={null}
                                                                                value={values.cepAvalista}
                                                                                type='text'
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Bairro</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <Field
                                                                                as={touchedFields.has('bairroAvalista') && errors.bairroAvalista ? FormInputError : FormInput}
                                                                                name='bairroAvalista'
                                                                                onFocus={
                                                                                    () => {
                                                                                        const newTouchedFields = new Set(touchedFields);
                                                                                        newTouchedFields.delete('bairroAvalista');
                                                                                        setTouchedFields(newTouchedFields);
                                                                                    }
                                                                                }
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                </SubItensPlus>
                                                                <SubItensContainer>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>UF</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <Field
                                                                                as={touchedFields.has('ufAvalista') && errors.ufAvalista ? FormInputError : FormInput}
                                                                                name='ufAvalista'
                                                                                onFocus={
                                                                                    () => {
                                                                                        const newTouchedFields = new Set(touchedFields);
                                                                                        newTouchedFields.delete('ufAvalista');
                                                                                        setTouchedFields(newTouchedFields);
                                                                                    }
                                                                                }
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Cidade</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <Field
                                                                                as={touchedFields.has('cidadeAvalista') && errors.cidadeAvalista ? FormInputError : FormInput}
                                                                                name='cidadeAvalista'
                                                                                onFocus={
                                                                                    () => {
                                                                                        const newTouchedFields = new Set(touchedFields);
                                                                                        newTouchedFields.delete('cidadeAvalista');
                                                                                        setTouchedFields(newTouchedFields);
                                                                                    }
                                                                                }
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                </SubItensContainer>
                                                            </StyledFormColumn>
                                                        )
                                                    }
                                                </StyledFormContent>
                                            </>
                                        )
                                    }
                                    <ButtonGroup>
                                        {
                                            step > 1 && (
                                                <BackButton
                                                    onClick={() => setStep(step - 1)}
                                                    type="button"
                                                >
                                                    Voltar
                                                </BackButton>
                                            )
                                        }
                                        {
                                            step < 3 && (
                                                <NextButton
                                                    onClick={() => handleNext(validateForm, setTouchedFields)}
                                                    type="button"
                                                >
                                                    Próximo
                                                </NextButton>
                                            )
                                        }
                                        {(!isSubmitting && step === 3) && (
                                            <SubmmitButton type='submit'>
                                                Registrar
                                            </SubmmitButton>
                                        )}

                                        {(isSubmitting && step === 3) && (
                                            <ThreeDots
                                                color={colors.theme}
                                                height={49}
                                                width={100}
                                            />
                                        )}
                                    </ButtonGroup>
                                </StyledFormArea>
                            </Form>
                        )
                    }
                </Formik>
            </ModalContainer>
        </Modal>
    );
}

export default ContractModal;