import {
    Container,
    CopyrightText,
} from './style.js';

const Footer = () => {
    return (
        <Container>
            <CopyrightText>&copy; Todos os direitos resevados - {new Date().getFullYear()}</CopyrightText>
        </Container>
    )
}

export default Footer;