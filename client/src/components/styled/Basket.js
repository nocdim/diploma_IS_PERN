import styled from "styled-components"

const Header = styled.h2`
    display: flex; 
    justify-content: center;
    margin-top: 1rem;
`
const Image = styled.img`
    width: 120px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
`
const InvisibleDiv = styled.div`
    visibility: hidden;
    position: absolute;
    top: -9999px;
`
const TableDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 60px;
    font-size: 22px;
    font-weight: 400;
`
const SumDiv = styled.div`
    display: flex;
    justify-content: end;
    font-size: 22px;
    font-weight: 400;
    padding-right: 25px;
    padding-bottom: 15px;
`
const TableDivH = styled.div`
    display: flex;
    justify-content: center;
    font-size: 22px;
    font-weight: 500;
`
const EndDiv = styled.div`
    display: flex;
    justify-content: end;
`

const DeleteBtn = styled.button`
    width: 40px;
    height: 40px;
    margin-top: 60px;
    border: 1px solid #ff000098;
    outline: none;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    background-color: #ff00004c;
    color: black;
    font-size: 18px;
    cursor: pointer;

    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px);
        background-color: #ff000098;
        border: 1px solid black;
        color: black;
    }
`
const Purchase = styled.button`
    width: 200px;
    height: 40px;
    border: none;
    outline: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #505050;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px)
    }
`
const Empty = styled.div`
    width: 100%;
    height: calc(100vh - 72.8px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 44px;
`

export {
    Header,
    Image,
    InvisibleDiv,
    TableDiv,
    TableDivH,
    SumDiv,
    EndDiv,
    DeleteBtn,
    Purchase,
    Empty,
}