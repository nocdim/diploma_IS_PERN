import styled from "styled-components"

const Container = styled.div`
    min-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 2rem;
    position: relative;

    h4 {
        color: #808080;
        font-weight: bold;
        font-size: 13px;
        margin-top: 2rem;

        span {
            color: #ab8dff;
            cursor: pointer;
        }
    }
`

const Logo = styled.div`
    padding: 1rem 0;
    color: #7b7fda;
    text-decoration: none;
    font-weight: 800;
    font-size: 2.3rem;
    cursor: pointer;

    span {
        font-weight: 300;
        font-size: 1.7rem;
    }
`

const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
        color: #fff;
        margin-bottom: 2rem;
    };
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

        transition: all 0.2s ease-in;

        &:hover {
            transform: translateY(-3px)
        }
    }
`

export {
    Container,
    Logo,
    Form,
}