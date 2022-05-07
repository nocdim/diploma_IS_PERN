import styled from 'styled-components';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';

const Nav = styled.div`
    padding: 0 2rem;
    justify-content: space-between;
    align-items: center;
    background: ${({link}) => (link.indexOf(ADMIN_ROUTE) !== -1 ? '#0d6efd' : '#3a3055')};
    display: ${({link}) => (link.indexOf(REGISTRATION_ROUTE) !== -1 || link.indexOf(LOGIN_ROUTE) !== -1 ? 'none' : 'flex')};
    flex-wrap: wrap;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.90);
`

const Options = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;

    span {
        height: 2px;
        width: 25px;
        background-color: #7b7fda;
        margin-bottom: 4px;
        border-radius: 5px;
    }

    @media (max-width: 768px) {
        display: flex;
    }
`

const MenuLink = styled.a`
    padding: 1rem 2rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: white;
    transition: all 0.3s ease-in;

    &:hover {
        color: ${({link}) => (link.indexOf(ADMIN_ROUTE) !== -1 ? 'silver' : '#67bc98')};
    }
`

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        overflow: hidden;
        flex-direction: column;
        width: 100%;
        max-height: ${({ isOpen })=> (isOpen ? "300px" : "0px" )};
        transition: max-height 0.3s ease-in;
    }
`

const Logo = styled.div`
    padding: 1rem 0;
    color: ${({link}) => (link.indexOf(ADMIN_ROUTE) !== -1 ? 'white' : '#7b7fda')};
    text-decoration: none;
    font-weight: 800;
    font-size: 1.7rem;
    cursor: pointer;

    span {
        font-weight: 300;
        font-size: 1.3rem;
    }
`

export {
    Nav,
    Options,
    Menu,
    MenuLink,
    Logo,
}