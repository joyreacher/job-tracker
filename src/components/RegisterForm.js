import React from "react"
import { Link } from 'gatsby'
import axios from 'axios'
import styled from "@emotion/styled"
import { css, jsx } from '@emotion/react'
import { trackPromise} from 'react-promise-tracker';
import { LoadingSpinnerComponent } from "./Spinner"
import toast from "react-hot-toast"
const FormContainer = styled.form`
  display:flex;
  flex-direction:column;
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
  font-size: clamp(1.4rem, 1vw, 2rem);
  border-radius: 2px;
  padding:.5rem;
  text-align:center;
  font-size: 1rem;
  background-color: var(--color-main-dark);
  border-radius: 7px;
  cursor:pointer;
  color:var(--color-morph-light);
  z-index:500;
  transition: background-color .25s ease, color .30s ease-in;
  &:hover{
    background-color:var(--color-main-success);
    color:var(--color-main-light);
    animation-play-state: running;
  }

`
const FormInput = styled.input`
  font-size: 2rem;
`
function RegisterForm() {
  const handleSubmit = (e) =>{
    e.preventDefault()
    trackPromise(
      axios({
        url: 'https://job-tracker-api-v1.herokuapp.com/register',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          username: e.target[0].value,
          password: e.target[1].value
        }
      })
        .then(response => {
          console.log(response)
          if(response.status === 201){
            console.log('route to login')
            toast.success('You may login')
          }
        })
        .catch((error) =>{
          console.log(error.response.data)
          toast.error(error.response.data)
        })
    )
    
  }
  return (
    <FormContainer onSubmit={handleSubmit}>
      <LoadingSpinnerComponent />
      <FormCell>  
        <FormLabel htmlFor="username">Username</FormLabel>
        <FormInput  name="username" type="text" id="username"/>
      </FormCell>
      <FormCell>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput  name="password" type="password" id="password"/>
      </FormCell> 
      <FormCell>
        <FormSubmit type='submit'>Register</FormSubmit>
        <Link 
          css={css`
              max-width: fit-content;
              text-decoration:none;
              color:var(--color-main-link);
              margin-top:3em;
              &:hover{
                color:var(--color-main-link-hover);
              }
            `}
          to='/login/'>
            Have an account? Login here.
        </Link>
      </FormCell>
      
    </FormContainer>
  )
}

export default RegisterForm