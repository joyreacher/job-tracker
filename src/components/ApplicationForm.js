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
`
const FormInnerContainer = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-center: center;
  width: 80%;
  margin:0 auto;
  padding:1em 2em;
  height: 100vh;
`
const FormCell = styled.div`
  display:flex;
  flex-direction: column;
`
const SubmitCell = styled.div`
  display:flex;
  min-width:100%;
  justify-content:center;
`
const FormLabel = styled.label`
  margin:.5rem 0;
  width:fit-content;
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
function ApplicationForm({handleClick, handleSubmit}) {
  return (
    <FormContainer className="application-form" onSubmit={handleSubmit}>
    <FormInnerContainer className="application-form__inner-container">
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
        <FormInput  name="notes" type="textarea"/>
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