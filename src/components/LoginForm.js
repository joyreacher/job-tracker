import React, { useContext } from "react"
import { Link } from 'gatsby'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
import { LoadingSpinnerComponent } from "./Spinner"
import styled from "@emotion/styled"
import { css, jsx } from '@emotion/react'
import toast from "react-hot-toast";
import { DataContext } from "../context/DataContext";
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
  const [state, dispatch] = useContext(DataContext)
  const handleSubmit = (e) =>{
    e.preventDefault()
    trackPromise(
      axios({
        url: 'https://job-tracker-api-v1.herokuapp.com/login',
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
          
          if(response.status === 200){
            const res = response.data
            dispatch({type: 'login',token:res.token})
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', res.user.username)
            return window.location.href = 'https://www.brianthomas-develops.com/projects/jobby/'
          }
        })
        .catch((error) =>{
          return toast.error(error.response.data.message)
        })
    )
    
  }
  return (
    <FormContainer onSubmit={handleSubmit}>
      <LoadingSpinnerComponent />
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
          to='/register/'>
            No account? Register here.
        </Link>
      </FormCell>
    </FormContainer>
  )
}

export default LoginForm