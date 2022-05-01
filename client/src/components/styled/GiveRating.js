import styled from "styled-components";

const Btn = styled.button`
    max-width: 150px;
    min-width: 100px;
    height: 40px;
    border: none;
    outline: none;
    margin: 1rem 0.5rem;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #3a3055;
    color: white;
    font-size: 25px;
    font-weight: 400;
    cursor: pointer;

    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px);
        background-color: #7b7fda;
        color: black;
    }
`

export {
    Btn
}