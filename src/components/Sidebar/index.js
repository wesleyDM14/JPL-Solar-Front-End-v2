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
import { FaTimes, FaTachometerAlt, FaUser, FaPowerOff, FaFileAlt } from 'react-icons/fa';

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
                <MenuTitleSection>ADMINISTRATIVO</MenuTitleSection>
                <MenuItemContainer onClick={() => navigate('/contratos')}>
                    <IconContainer>
                        <FaFileAlt />
                    </IconContainer>
                    <MenuItemTitle>Contratos</MenuItemTitle>
                </MenuItemContainer>
                <MenuTitleSection>PESSOAL</MenuTitleSection>
                <MenuItemContainer onClick={() => navigate('/profile')}>
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