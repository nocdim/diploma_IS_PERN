import styled from "styled-components"

const DeleteItem = styled.button`
    width: 180px;
    height: 40px;
    border: 1px solid #ff000098;
    outline: none;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #ff00004c;
    color: #505050;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px);
        background-color: #ff000098;
        border: 1px solid black;
        color: black;
    }
`
const ChangeQuantity = styled.button`
    width: 180px;
    height: 40px;
    border: none;
    outline: none;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #3a3055;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px);
    }
`

const BodyDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        font-size: 26px;
        font-weight: 400;
        margin: 10px;
    }
`

const BtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 140px;
    height: 40px;
    border-radius: 8px;

    div {
        font-size: 24px;
    }

    button {
        width: 40px;
        height: 40px;
        border: none;
        outline: none;
        border-radius: 8px;
        background-color: #3a3055;
        color: white;
        cursor: pointer;
        font-size: 18px;
        font-weight: 500;
    }
`

export {
    DeleteItem,
    ChangeQuantity,
    BodyDiv,
    BtnContainer,
}