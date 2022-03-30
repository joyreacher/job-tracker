import React, { useEffect, useRef, useState, useContext } from "react"
import {DataContext} from "../context/DataContext";
import { Link } from 'gatsby'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
import { LoadingSpinnerComponent } from "./Spinner"
import styled from "@emotion/styled"
import { css, jsx } from '@emotion/react'
import toast from "react-hot-toast";
const breakpoints = [376, 411, 576, 768, 845, 978, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)
const FormContainer = styled.form`
  background-color: var(--color-menu-overlay);
  position:fixed;
  top:0;
  width:100%;
  visibility:hidden;
  z-index:10;
  height:100vh;
`
const FormInnerContainer = styled.div`
  margin:0 auto 3em auto;
  padding-top: 4em;
  padding-bottom: 1em;
  // height: 100vh;
  ${mq[4]}{
    padding-left:2em;
    display:flex; 
    flex-wrap:wrap;
  }
  ${mq[2]}{
    padding-left:0;
    flex-direction:column;
  }
`
const FormCell = styled.span`
  display:flex;
  justify-content:space-between;
  
  width: 30%;
  margin:.5em auto;
  min-width50%;
  ${mq[7]}{
    width:40%;
  }
  ${mq[6]}{
    width:50%;
  }
  ${mq[4]}{
    width:50%;
    font-size: clamp(1.1rem, 1vw, 2rem);
    flex-direction:column;
  }
  ${mq[2]}{
    margin:.25em auto;
  }
`
const SubmitCell = styled.div`
  display:flex;
  min-width:100%;
  justify-content:center;
`
const FormLabel = styled.label`
  width:fit-content;
  color: var(--color-main-light);
`
const FormSubmit = styled.button`
  align-self: center;
  background-color: var(--color-main-light);
  font-size: clamp(1rem, 1vw, 1.2rem);
  border-radius: 2px;
  padding:.5rem;
  margin-top:2em;
`
const FormInput = styled.input`
  text-align:right;
  max-width:50%;
  ${mq[4]}{
    max-width: 90%;
  }
  ${mq[2]}{
    max-width: 100%;
    min-width:10em;
  }
`
const FormInputTextArea = styled.textarea`
  font-size: clamp(.9rem, 2vw, 1rem);
  width: 90%;
`
function ApplicationForm({AddJobModalHandler, handleSubmit}) {
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
        <FormInput id="contact" name="contact" pattern="[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9]{4}" type="tel" placeholder="xxx-xxx-xxxx"/>
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
        <FormSubmit onClick={async () => await AddJobModalHandler()} type='submit'>Add Job</FormSubmit>
      </SubmitCell>
    </FormInnerContainer>
  </FormContainer>

      
        
  )
}

export default ApplicationForm