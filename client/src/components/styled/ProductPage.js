import styled from "styled-components"

const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const ImgDiv = styled.div`
    img {
        width: 280px;
        height: 350px;
        border-radius: 6px;
        object-fit: cover;
    }
`
const BottomDiv = styled.div`
    display: flex;
    justify-content: end;

    div {
        margin: 1rem 2rem 0rem 0rem;
        font-size: 24px;   
    }
`
const Button = styled.button`
    max-width: 350px;
    min-width: 276px;
    height: 40px;
    border: none;
    outline: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #3a3055;
    color: white;
    cursor: pointer;

    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px)
    }
`
const Rating = styled.div`
padding-top: 5px;
cursor: ${({ userRole }) => (userRole === 'USER' ? 'pointer' : 'default')};
    h3 {
        display: flex;
        align-items: top;
        img {
            width: 15px;
            height: 15px;
        }
    }
`

const BtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 140px;
    height: 40px;
    border-radius: 8px;
    margin: 1rem 3rem;
    
    span {
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

const CommentHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
`
const CommentDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 892px;
    padding: 2rem;
    border: 1px dashed #00000065;
    border-radius: 8px;
    font-size: 20px;
`

export {
    TopDiv,
    ImgDiv,
    BottomDiv,
    Button,
    Rating,
    BtnContainer,
    CommentDiv,
    CommentHeader
}