import React, { useEffect, useState, useContext } from "react"
import { DataContext } from '../context/DataContext'
import styled from "@emotion/styled"
import { Toaster } from "react-hot-toast"
import gsap  from "gsap";
import { CSVLink, CSVDownload } from 'react-csv'
import { css, jsx } from '@emotion/react'
const breakpoints = [376, 411, 576, 768, 845, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)


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
  ${mq[4]}{
    display:none;
  }
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
const IconDotOne = styled.div`
  height:7.5px;
  width:7.5px;
  border-radius: 50px;
  background-color: var(--color-main-dark);
`
const IconDotTwo = styled.div`
  margin:.2em 0;
  height:7.5px;
  width:7.5px;
  border-radius: 50px;
  background-color: var(--color-main-dark);
`
const IconDotThree = styled.div`
  height:7.5px;
  width:7.5px;
  border-radius: 50px;
  background-color: var(--color-main-dark);
`
const MenuIcon = styled.div`
  display:none;
  cursor:pointer;
  ${mq[4]}{
    display:block;
  }
`
const MenuText = styled.p`
  align-self: center;
`
const LogOutLink = styled.p`
  cursor: pointer;
`
const menuTl = gsap.timeline({paused: true, reversed:true})
let menuTlExitTime = 0
function Navbar({handleClick, timeline, jobs, jobView}) {
  const [state, dispatch]= useContext(DataContext)
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('jobs')
    return window.location.href = 'https://www.brianthomas-develops.com/projects/jobby/login'
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
  const handleMenuClick = () => {
    if(menuTl.reversed()){
      menuTl.play()
    }
    else if(menuTl.paused()){
      menuTl.play()
    }
    else if(menuTl.totalProgress(1)){
      menuTl.seek('start')
    }
    
  }
  useEffect(() =>{
    if(state.user){
      let setEase = 'bounce.out'
      timeline
      .from('.application-form', {opacity: 0, autoAlpha: 0})
      .from('.application-form__inner-container', {opacity: 0, autoAlpha:0 }, '<');
      menuTl
      .addLabel('start')
      .to('#menu-icon > div',  {
        background: 'red'
      })
      .to('#icon-one', {
        x:'.3rem',
        y:'2.3rem',
        ease: setEase,
      }, '<')
      .to('#icon-two', {
        x:'-1.1rem',
        y:'1.5rem',
        ease: setEase,
      }, '<')
      .to('#icon-three', {
        x:'-.4rem',
        y:'.8rem',
        ease: setEase,
      }, '<')
      .addPause('exit')
      .addLabel('mid')
      menuTl.to('#menu-icon > div', {
        background:'var(--color-main-dark)',
      })
      .to(['#icon-one', '#icon-two', '#icon-three'], {
        x:0,
        y:0,
        ease:'power3.in'
      }, '<')
      .addLabel('end')
      
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
            <MenuIcon 
              id="menu-icon"
              onClick={() => handleMenuClick()}
            >
              <IconDotOne id="icon-one"/>
              <IconDotTwo id="icon-two"/>
              <IconDotThree id="icon-three"/>
            </MenuIcon>
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