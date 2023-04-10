import {
    Container,
    ImgLogo,
    SubTitle,
    Title,
    TitleContainer,
} from "./style";

const ProfilePage = () => {
    return (
        <Container>
            <ImgLogo />
            <TitleContainer>
                <Title>JPL ENGENHARIA LTDA </Title>
                <SubTitle>CNPJ: 33.651.180/0001-09</SubTitle>
                <SubTitle>R. Nicola Tesla, 189, Maria Manoela, São Miguel-RN, CEP 59.920-000</SubTitle>
                <SubTitle>Telefone: (84) 9 9813-3818 / (83) 9 9615-1895 / (84) 9 9930-0037</SubTitle>
                <SubTitle>jpl_engenharia@hotmail.com</SubTitle>
                <SubTitle></SubTitle>
            </TitleContainer>
        </Container>
    )
}

export default ProfilePage;