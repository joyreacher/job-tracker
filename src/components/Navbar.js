import React, { useEffect, useState, useContext } from "react"
import { DataContext } from '../context/DataContext'
import styled from "@emotion/styled"
import { Toaster } from "react-hot-toast"
import gsap  from "gsap";


// components
import ApplicationForm from './ApplicationForm.js'

const NavbarContainer = styled.nav`
  align-items:center;
  height:20vh;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  background-color: var(--color-navbar);
`
const InnerContainer = styled.div`
  height:100%;
  align-items: center;
  margin:0 auto;
  display:flex;
  justify-content: flex-end;
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
`
const MenuText = styled.p`
  align-self: center;
`
const LogOutLink = styled.p`
  cursor: pointer;
`

function Navbar({handleClick, timeline}) {
  const tl = timeline
  const [state, dispatch]= useContext(DataContext)
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('jobs')
    return window.location.href = '/login'
  }

  useEffect(() =>{
    tl
      .from('.application-form', {opacity: 0, display:'none', autoAlpha: 0})
      .from('.application-form__inner-container', {opacity: 0 }, '<')
  },[])
  return (
    <>
      <NavbarContainer>
        <InnerContainer>
          <Toaster />
          {
            !state.user ? '' : <MenuContainer>
              <p>Hello {state.user}</p>
              <CSVLink data={jobs}
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
      {/* <ApplicationForm handleClick={handleClick} /> */}
    </>
  )
}

export default Navbar