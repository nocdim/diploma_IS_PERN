import styled from "styled-components"

const Card = styled.div`
    width: 200px;
    margin: 0.5rem 2rem 2rem 0;
    cursor: pointer;

    .name {
        font-size: 16qpx;
        color: #3a3055;
    }
`

const Image = styled.img`
        width: 200px;
        height: 250px;
        border: none;
        border-radius: 4px;
        object-fit: cover;
`

const Rating = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #0000007f;
    font-size: 16px;
    margin-top: 0.5rem;

    .rating {
        display: flex;
        align-items: center;

        img {
            width: 16px;
            height: 16px;
        }
    }
`

export {
    Card,
    Image,
    Rating
}