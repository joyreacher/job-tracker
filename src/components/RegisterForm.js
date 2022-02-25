import React, { useEffect } from "react"
import styled from "@emotion/styled"
const FormContainer = styled.form`
  display:flex;
  flex-direction: column;
  align-items:center;
`
const FormCell = styled.div`
  width:50%;
  display:flex;
  flex-direction: column;
  margin:1rem auto;
`
const FormLabel = styled.label`
  margin:.75rem 0;
`
const FormSubmit = styled.button`
  align-self: center;
  background-color: var(--color-main-light);
  font-size: clamp(1.4rem, 1vw, 2rem);
  border-radius: 2px;
  padding:.5rem;
`
const FormInput = styled.input`
  font-size: 2rem;
`
function RegisterForm() {
  return (
    <FormContainer>
      <FormCell>  
        <FormLabel for="username">Username</FormLabel>
        <FormInput name="username" type="text" />
      </FormCell>
      <FormCell>
        <FormLabel for="username">Password</FormLabel>
        <FormInput name="password" type="password" />
      </FormCell>
      <FormCell>
        <FormSubmit type='submit'>Register</FormSubmit>
      </FormCell>
    </FormContainer>
  )
}

export default RegisterForm