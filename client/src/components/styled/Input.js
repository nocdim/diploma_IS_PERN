import styled from "styled-components"
import { PRODUCT_ROUTE } from "../../utils/consts"

const StyledInput = styled.input`
    width: 80%;
    max-width: ${({link}) => (link.indexOf(PRODUCT_ROUTE) !== -1 ? 'inherit' : '350px')};
    min-width: ${({link}) => (link.indexOf(PRODUCT_ROUTE) !== -1 ? '250px' : '250px')};
    height: 40px;
    border: ${({link}) => (link.indexOf(PRODUCT_ROUTE) !== -1 ? '1px dashed #00000065' : 'none')};
    outline: none;
    margin: 0.5rem 0;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px)
    }
`

const Status = styled.div`
    height: 10px;
    width: 10px;
    background: #9d9d9d;
    border-radius: 10px;
    margin-left: 1rem;

    ${StyledInput}:invalid + & {
        background: #dc143c;
    }
    ${StyledInput}:focus + & {
        background: #ffa689;
    }
    ${StyledInput}:valid + & {
        background: #70edb9;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export {
    StyledInput,
    Status,
    Container
}