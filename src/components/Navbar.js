import React, { useEffect, useState, useContext } from "react"
import { DataContext } from '../context/DataContext'
import styled from "@emotion/styled"
import { Toaster } from "react-hot-toast"
import gsap  from "gsap";
import { CSVLink, CSVDownload } from 'react-csv'
import { css, jsx } from '@emotion/react'


// components
import ApplicationForm from './ApplicationForm.js'

const NavbarContainer = styled.nav`
  align-items:center;
  height:20vh;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  background-color: var(--color-morph-light);
  box-shadow: -2px -2px 5px var(--color-morph-light),
            3px 3px 5px var(--color-morph-dark);
`
const InnerContainer = styled.div`
  width:100%;
  height:100%;
  align-items: center;
  margin:0 auto;
  display:flex;
  justify-content: space-between;
  max-width: 1020px;
`
const MenuContainer = styled.div`
  font-size: 1.1rem;
  display:flex;
  align-items:center;
  width:25vw;
  justify-content: space-between;
  position: relative;
  z-index: 400;
`
const Menu = styled.div`
  display:flex;
  justify-content:center;
  text-align:center;
  font-size: 1rem;
  background-color: var(--color-main-dark);
  height:60px;
  width:60px;
  border-radius: 45px;
  cursor:pointer;
  color:var(--color-main-light);
`
const MenuText = styled.p`
  align-self: center;
`
const LogOutLink = styled.p`
  cursor: pointer;
`

function Navbar({handleClick, timeline, jobs, jobView}) {
  const [state, dispatch]= useContext(DataContext)
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('jobs')
    return window.location.href = '/login'
  }
  const checkForToken = () => {
    if(state.user){
      const headers = [
        { 
          ' ':'Job Leads',
          'Name': jobs[0].company,
          'Role': jobs[0].role,
          'Contact': jobs[0].contact,
          '': 'Job Information',
          'Name': jobs[0].company,
          'Role': jobs[0].role,
          'Contact': jobs[0].contact,
          'Location': jobs[0].location,
          'Source': jobs[0].source,
          'Link': jobs[0].link,
          'Notes': jobs[0].notes
        }
      ]
      return headers
    }
    return 
  }
  useEffect(() =>{
    if(state.user){
      timeline
      .from('.application-form', {opacity: 0, autoAlpha: 0})
      .from('.application-form__inner-container', {opacity: 0, autoAlpha:0 }, '<')
    }
  }, [jobView])
  if(state.user){
    return (
        <NavbarContainer>
          <InnerContainer>
            <p>Jobby</p>
            <Toaster />
            {
              !state.user ? '' : <MenuContainer>
                <p>Hello {state.user}</p>
                <CSVLink data={checkForToken()}
                  css={css`
                      text-decoration: none;
                      color:var(--color-main-light);
                      `}
                >
                  Download Jobs
                </CSVLink>
                <LogOutLink onClick={() => logout()}>logout</LogOutLink>
                <Menu onClick={async () => await handleClick()}>
                  <MenuText >
                    Add Job
                  </MenuText>
                </Menu>
              </MenuContainer>
            }
          </InnerContainer>
        </NavbarContainer>
    )
  }else{
    return(
        <NavbarContainer>
          <InnerContainer>
            <p>Jobby</p>
            <Toaster />
          </InnerContainer>
        </NavbarContainer>
    )
  }
}

export default Navbar