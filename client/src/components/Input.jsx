import React from 'react'
import { StyledInput, Status, Container } from '../components/styled/Input'


const Input = (props) => {
    return (
        <Container>
            <StyledInput 
            link={props.link}
            placeholder={props.placeholder && props.placeholder} 
            type={props.type ? props.type : "text"} 
            onChange={e => props.onChange(e.target.value)}
            required
            />
            <Status />
        </Container>
    )
}

export default Input