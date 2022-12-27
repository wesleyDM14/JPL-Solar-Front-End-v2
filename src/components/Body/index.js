import {
    Container,
    Mockup,
    TitleContainer,
    Title,
    SubTitle,
} from './style.js';

const Body = () => {
    return (
        <Container>
            <TitleContainer>
                <Title>Sistema de Monitoramento JPL Solar</Title>
                <SubTitle>Todas as usinas ao alcance de um click! </SubTitle>
            </TitleContainer>
            <Mockup />
        </Container>
    )
}

export default Body;