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
cursor: ${({userRole}) => (userRole === 'USER' ? 'pointer' : 'default')};
    h3 {
        display: flex;
        align-items: top;
        img {
            width: 15px;
            height: 15px;
        }
    }
`

export {
    TopDiv,
    ImgDiv,
    BottomDiv,
    Button,
    Rating,
}