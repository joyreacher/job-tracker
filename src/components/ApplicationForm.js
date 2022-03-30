import React, { useEffect, useRef, useState, useContext } from "react"
import {DataContext} from "../context/DataContext";
import { Link } from 'gatsby'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
import { LoadingSpinnerComponent } from "./Spinner"
import styled from "@emotion/styled"
import { css, jsx } from '@emotion/react'
import toast from "react-hot-toast";
const FormContainer = styled.form`
  background-color: var(--color-menu-overlay);
  position:fixed;
  top:0;
  width:100%;
  min-height:100vh;
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  visibility:hidden;
  z-index:10;
`
const FormInnerContainer = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-center: center;
  width: 80%;
  margin:0 auto;
  padding:3em 5em;
  height: 100vh;
`
const FormCell = styled.div`
  display:flex;
  flex-direction: column;
  font-size: clamp(1.5rem, 1vw, 2rem);
`
const SubmitCell = styled.div`
  display:flex;
  min-width:100%;
  justify-content:center;
`
const FormLabel = styled.label`
  margin:.5rem 0;
  width:fit-content;
  color: var(--color-main-light);
`
const FormSubmit = styled.button`
  align-self: center;
  background-color: var(--color-main-light);
  font-size: clamp(1.1rem, 1vw, 2rem);
  border-radius: 2px;
  padding:.5rem;
`
const FormInput = styled.input`
  font-size: 1.5rem;
  width: 90%;
`
const FormInputTextArea = styled.textarea`
  font-size: 1.5rem;
  width: 90%;
`
function ApplicationForm({handleClick, handleSubmit}) {
  return (
    <FormContainer className="application-form" onSubmit={handleSubmit}>
    <FormInnerContainer className="application-form__inner-container">
      <FormCell>  
        <FormLabel htmlFor="company">Company</FormLabel>
        <FormInput  id="company" name="company" type="text" placeholder="Facebook, Google, etc..."/>
      </FormCell>
      <FormCell>
        <FormLabel htmlFor="role">Role</FormLabel>
        <FormInput id="role" name="role" type="text" placeholder="Frontend Developer, etc..."/>
      </FormCell>
      <FormCell>
        <FormLabel htmlFor="contact">Contact</FormLabel>
        <FormInput id="contact" name="contact" type="text" placeholder="(xxx)xxx-xxxx"/>
      </FormCell>
      <FormCell>
        <FormLabel htmlFor="location">Location</FormLabel>
        <FormInput id="location" name="location" type="text" placeholder="Remote, USA, etc..."/>
      </FormCell>
      <FormCell>
        <FormLabel htmlFor="source">Source</FormLabel>
        <FormInput id="source" name="source" type="text" placeholder="ZipRecruiter, LinkedIn, etc..."/>
      </FormCell>
      <FormCell>
        <FormLabel htmlFor="link">Link</FormLabel>
        <FormInput id="link" name="link" type="text" placeholder="something.com"/>
      </FormCell>
      <FormCell>
        <FormLabel htmlFor="notes">Notes</FormLabel>
        <FormInputTextArea id="notes" name="notes" type="textarea" placeholder="Anything that comes to mind"/>
        <FormInput  name="date" type="hidden" value={new Date()} />
      </FormCell>
      <SubmitCell
        css={css`
            position:relative;
            `}
      >
        <LoadingSpinnerComponent position="absolute"/>
        <FormSubmit onClick={async () => await handleClick()} type='submit'>Add Job</FormSubmit>
      </SubmitCell>
    </FormInnerContainer>
  </FormContainer>

      
        
  )
}

export default ApplicationForm