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
                <LoginButton to={'/login'}>Login</LoginButton>
            </MenuContainer>
        </Container>
    )
}

export default Header;