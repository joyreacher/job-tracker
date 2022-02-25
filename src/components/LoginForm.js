import React, { useEffect, useRef, useState } from "react"
import axios from 'axios'
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
function LoginForm() {
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios({
      url: 'https://jobz-api.herokuapp.com/login',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json;charset=UTF-8'
      },
      data: {
        Username: e.target[0].value,
        Password: e.target[1].value
      }
    })
      .then(response => {
        console.log(response)
        const res = response.data
        console.log(res.user)
        localStorage.setItem(res.token, 'jobz-token')
        localStorage.setItem(res.user.username, 'jobz-username')
      })
      .catch((error) =>{
        console.log(error)
      })
  }
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormCell>  
        <FormLabel htmlFor="username">Username</FormLabel>
        <FormInput  name="username" type="text"/>
      </FormCell>
      <FormCell>
        <FormLabel htmlFor="username">Password</FormLabel>
        <FormInput  name="password" type="password"/>
      </FormCell>
      <FormCell>
        <FormSubmit type='submit'>Login</FormSubmit>
      </FormCell>
    </FormContainer>
  )
}

export default LoginForm