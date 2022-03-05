import React, { useEffect, useRef, useState } from "react"
import { Link } from 'gatsby'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
import { LoadingSpinnerComponent } from "./Spinner"
import styled from "@emotion/styled"
import { css, jsx } from '@emotion/react'
import toast from "react-hot-toast";
const FormContainer = styled.form`
  visibility:hidden;
  background-color: var(--color-menu-overlay);
  position:absolute;
  top:0;
  width:100%;
  max-height:100vh;
  display:flex;
  flex-wrap:wrap;
  align-items:center;
`
const FormInnerContainer = styled.div`
  display:block;
  width: 80%;
  margin:0 auto;
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
function ApplicationForm({token}) {
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    trackPromise(
      axios({
        url: 'https://job-tracker-api-v1.herokuapp.com/job/new',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json;charset=UTF-8',
          "Authorization" : `Bearer ${token}`
        },
        data: {
          username: localStorage.getItem('username'),
          company: e.target[0].value,
          role: e.target[1].value,
          contact: e.target[2].value,
          location: e.target[3].value,
          source: e.target[4].value,
          link: e.target[5].value,
          notes: e.target[6].value,
          dateAdded: e.target[7].value
        },
      })
        .then(response => {
          toast.success('Success')
        })
        .catch((error) =>{
          return toast.error(error.response.data.message)
        })
    )
    
  }
  return (
    <FormContainer className="application-form" onSubmit={handleSubmit}>
      <FormInnerContainer className="application-form__inner-container">
        <LoadingSpinnerComponent />
        <FormCell>  
          <FormLabel htmlFor="company">Company</FormLabel>
          <FormInput  name="company" type="text"/>
        </FormCell>
        <FormCell>
          <FormLabel htmlFor="role">role</FormLabel>
          <FormInput  name="role" type="text"/>
        </FormCell>
        <FormCell>
          <FormLabel htmlFor="contact">Contact</FormLabel>
          <FormInput  name="contact" type="text"/>
        </FormCell>
        <FormCell>
          <FormLabel htmlFor="location">Location</FormLabel>
          <FormInput  name="location" type="text"/>
        </FormCell>
        <FormCell>
          <FormLabel htmlFor="source">Source</FormLabel>
          <FormInput  name="source" type="text"/>
        </FormCell>
        <FormCell>
          <FormLabel htmlFor="link">link</FormLabel>
          <FormInput  name="link" type="text"/>
        </FormCell>
        <FormCell>
          <FormLabel htmlFor="notes">notes</FormLabel>
          <FormInput  name="notes" type="text"/>
          <FormInput  name="date" type="hidden" value={new Date()} />
        </FormCell>
        <FormCell>
          <FormSubmit type='submit'>Add Job</FormSubmit>
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
              Go to your profile.
          </Link>
        </FormCell>
      </FormInnerContainer>
    </FormContainer>
  )
}

export default ApplicationForm