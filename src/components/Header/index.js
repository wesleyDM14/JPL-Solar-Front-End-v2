import {
    Container,
    Logo,
    MenuContainer,
    LoginButton
} from './style.js';

const Header = () => {
    return (
        <Container>
            <Logo />
            <MenuContainer>
                <LoginButton>Login</LoginButton>
            </MenuContainer>
        </Container>
    )
}

export default Header;