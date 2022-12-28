import {
    TitleContainer,
    Avatar,
    Title,
    MenuContainer,
    ImageContainer,
    MenuTitleSection,
    MenuItemContainer,
    MenuItemTitle,
    LogoultContainer,
    Logoult,
    IconContainer,
    CloseContainer
} from './style.js';
import logo from '../../assets/logo.png';
import { FaTimes, FaTachometerAlt, FaUser, FaPowerOff } from 'react-icons/fa';

const Sidebar = ({ sidebarOpen, closeSidebar, logoultUser, navigate }) => {
    return (
        <div className={sidebarOpen ? 'sidebar-responsive' : ''} id='sidebar'>
            <TitleContainer>
                <ImageContainer>
                    <Avatar image={logo} />
                    <Title>JPL-Solar</Title>
                </ImageContainer>
                <CloseContainer>
                    <FaTimes onClick={() => closeSidebar()} id={'sidebarIcon'} aria-hidden={true} />
                </CloseContainer>
            </TitleContainer>
            <MenuContainer>
                <MenuTitleSection>ADMIN</MenuTitleSection>
                <MenuItemContainer>
                    <IconContainer>
                        <FaTachometerAlt />
                    </IconContainer>
                    <MenuItemTitle>Área Administrativa</MenuItemTitle>
                </MenuItemContainer>
                <MenuTitleSection>PESSOAL</MenuTitleSection>
                <MenuItemContainer>
                    <IconContainer>
                        <FaUser />
                    </IconContainer>
                    <MenuItemTitle>Perfil</MenuItemTitle>
                </MenuItemContainer>
                <LogoultContainer onClick={() => logoultUser(navigate)}>
                    <IconContainer>
                        <FaPowerOff />
                    </IconContainer>
                    <Logoult>Logout</Logoult>
                </LogoultContainer>
            </MenuContainer>
        </div>
    )
}

export default Sidebar;