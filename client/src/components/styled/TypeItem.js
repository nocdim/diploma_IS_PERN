import styled from "styled-components"

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.15);
    outline: none;
    margin: 0.5rem 0;
    color: ${({ active }) => (active) ? '#f5f5f5' : '#3a3055'};
    background-color: ${({ active }) => (active) ? '#3a3055' : '#f5f5f5'};
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;
    cursor: pointer;

    &:hover {
        transform: translateX(-3px)
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export {
    Item,
    Container
}