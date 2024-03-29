import {
    NavbarContainer,
    LeftContainer,
    RightContainer,
    NavbarIten,
    NavbarShowIcon,
    NavbarAvatar
} from './style.js';
import { FaBars} from "react-icons/fa";
import logo from '../../assets/logo.png';

const Navbar = ({openSidebar}) => {
    return(
        <NavbarContainer>
            <NavbarShowIcon onClick={()=> openSidebar()}>
                <FaBars />
            </NavbarShowIcon>
            <LeftContainer>
                <NavbarIten to={'/dashboard'}>Dashboard</NavbarIten>
                <NavbarIten to={'/clients'}>Clientes</NavbarIten>
            </LeftContainer>
            <RightContainer>
                <NavbarAvatar image={logo}/>
            </RightContainer>
        </NavbarContainer>
    )
}

export default Navbar;