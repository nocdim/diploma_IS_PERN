import styled from "styled-components";

const Search = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    input {
        width: 80%;
        max-width: 1000px;
        min-width: 250px;
        height: 40px;
        border: 1px dashed #00000065;
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
    }
    button {
        width: 80px;
        height: 40px;
        border: none;
        outline: none;
        border-radius: 8px;
        background-color: #3a3055;
        color: white;
        cursor: pointer;
        font-size: 18px;
        margin-left: 1rem;
        transition: all 0.2s ease-in;

        &:hover {
            transform: translateY(-3px)
        }
    }
`

export {
    Search
}