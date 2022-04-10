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
  padding:5em 0;
  height:100%;
  display:grid;
  place-items:center center;
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
  font-size:clamp(1rem, 2vw, 1.5rem);
`

const FormInput = styled.input`
  padding:.05rem;
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
  width:initial;
  ${mq[4]}{
    width:90%;
  }
  
`
const AddJobButton = styled.button`
  display:flex;
  margin:2em 0;
  justify-content:center;
  text-align:center;
  font-size: clamp(1.3rem, 1vw, 1.5rem);
  background-color: var(--color-main-dark);
  border-radius: 7px;
  padding:.25em;
  cursor:pointer;
  color:var(--color-main-light);
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
        <AddJobButton onClick={async () => await AddJobModalHandler()} type='submit'>Add Job</AddJobButton>
      </SubmitCell>
    </FormInnerContainer>
  </FormContainer>

      
        
  )
}

export default ApplicationForm