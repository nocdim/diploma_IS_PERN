import styled from "styled-components";

const ThankYou = styled.div`
    width: 100%;
    height: calc(100vh - 72.8px);
    display: flex;
    justify-content: center;
    align-items: center;
    

    p {
        font-size: 44px;
    }
    button {
        max-width: 350px;
        min-width: 276px;
        height: 40px;
        border: none;
        outline: none;
        margin: 1rem 0;
        box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        background-color: #70edb9;
        color: #505050;
        cursor: pointer;
        font-size: 20px;

        transition: all 0.2s ease-in;

        &:hover {
            color: white;
            background-color: #3a3055;
            transform: translateY(-3px)
        }
    }
`

export {
    ThankYou
}