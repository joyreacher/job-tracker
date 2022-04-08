import React, { useEffect, useState, useContext } from "react"
import { DataContext } from '../context/DataContext'
import styled from "@emotion/styled"
import { Toaster } from "react-hot-toast"
import gsap  from "gsap";
import { CSVLink, CSVDownload } from 'react-csv'
import { css, jsx } from '@emotion/react'
const breakpoints = [376, 411, 576, 768, 845, 978, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)



const NavbarContainer = styled.nav`
  align-items:center;
  height:20vh;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  padding: 0 2em;
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
  width:55%;
  justify-content: space-between;
  position: relative;
  ${mq[2]}{
    display:none;
  }
`
// Add job button
const Menu = styled.button`
  display:flex;
  justify-content:center;
  text-align:center;
  font-size: 1rem;
  background-color: var(--color-main-dark);
  border-radius: 7px;
  padding:.25em;
  cursor:pointer;
  color:var(--color-main-light);
  z-index:500;
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
  padding:2em 0 2em 2em;
  ${mq[2]}{
    display:block;
    position:relative;
    z-index:400;
  }
`
const MenuText = styled.p`
  align-self: center;
`
const LogOutLink = styled.p`
  cursor: pointer;
`
const Overlay = styled.div`
  display:none;
  position:fixed;
  height:100vh;
  width:100vw;
  z-index:201;
  background-color:var(--color-main-dark);
  top:0;
  left:0;
  padding:2em;
`
const MenuContainerOverlay = styled.div`
  height:100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:flex-end;
  color:var(--color-main-light);
  p, a{
    margin:1.3em 0;
  }
`
const AddJobButtonMobile = styled.button`
  display:none;
  ${mq[2]}{
    position:relative;
    display:block;
    font-size: 1rem;
    background-color: var(--color-main-dark);
    border-radius: 7px;
    padding:.25em;
    cursor:pointer;
    color:var(--color-main-light);
    z-index:200;
  }
`
const LogoText = styled.h1`
  color:var(--color-main-dark);
  position:relative;
  z-index:500;
`
const buttonAnimation = gsap.timeline({paused:true})
function Navbar({AddJobModalHandler, timeline, jobs, jobView, menuTl}) {
  const [state, dispatch]= useContext(DataContext)
  const [display, setDisplay] = useState(false)
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('jobs')
    localStorage.removeItem('jobView')
  }
  const downloadJobs = () =>{
    if(jobs !== undefined){
      
      const result = jobs.map((job, i) => {
        // const dateAdded = TODO: select the 3 months ago in the dom
        return {
          'Name': jobs[i].company,
          'Role': jobs[i].role,
          'Contact': jobs[i].contact,
          'Name': jobs[i].company,
          'Role': jobs[i].role,
          'Contact': jobs[i].contact,
          'Location': jobs[i].location,
          'Source': jobs[i].source,
          'Link': jobs[i].link,
          'Applied': jobs[i].stage.applied,
          'Face to Face': jobs[i].stage.faceToface,
          'Phone Screen': jobs[i].stage.phoneScreen,
          'Take Home Assignment': jobs[i].stage.takeHomeAssignment.dateReceived,
          'Notes': jobs[i].notes,
        }
      })
      return result
    }
    return []
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
      .set('body', {overflow:'hidden'})
      .from('.application-form', {opacity: 0, autoAlpha: 0})
      .from('.application-form__inner-container', {opacity: 0, autoAlpha:0 }, '<');
      menuTl
      .addLabel('start')
      .to('#menu-icon > div',  {
        background: 'red'
      })
      .fromTo('.modal', {yPercent:'-100'},{
        yPercent: '0',
        display:'block',
        opacity:1,
        ease: 'power4.out'
      }, '<')
      .fromTo('.logo-text', {
        y:0,
        color:'var(--color-main-dark)',
        ease:'elastic.out(1, .3)',
      },{
        y:'10px',
        color:'var(--color-main-light)',
        ease:'elastic.out(1, .3)'
      })
      .to('#icon-one', {
        x:'.3rem',
        y:'2.3rem',
        ease: setEase,
      }, '<')
      .to('#icon-two', {
        x:'-1.1rem',
        y:'1.6rem',
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
      .to('.modal',{
        display:'none',
        opacity:0
      }, '<')
      .to('.logo-text', {
        y:0,
        color:'var(--color-main-dark)',
        ease:'power3.in'
      }, '<')
      .to(['#icon-one', '#icon-two', '#icon-three'], {
        x:0,
        y:0,
        ease:'power3.in'
      }, '<')
      .addLabel('end')
      
    }
  }, [jobView, timeline])
  if(state.user){
    return (
        <NavbarContainer>
          <InnerContainer>
            <LogoText className="logo-text">Jobby</LogoText>
            <Toaster />
            <AddJobButtonMobile
              onClick={async () =>{
                if(!display){
                  setDisplay(true)
                }else{
                  setDisplay(false)
                }
                await AddJobModalHandler()
                }}
            >
              {!display ? 'Add Job' : 'Close'}
            </AddJobButtonMobile>
            {
              !state.user ? '' : <MenuContainer>
                <p>Hello {state.user}</p>
                <CSVLink data={checkForToken()}
                  css={css`
                      text-decoration: none;
                      color:var(--color-main-dark);
                      `}
                >
                  Download Jobs
                </CSVLink>
                <LogOutLink onClick={() => logout()}>logout</LogOutLink>
                <Menu onClick={async () => {
                  if(!display){
                    setDisplay(true)
                  }else{
                    setDisplay(false)
                  }
                  await AddJobModalHandler()
                  }}>
                  <MenuText >
                    {!display ? 'Add Job' : 'Close'}
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
            <Overlay className="modal">
              <MenuContainerOverlay>
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
                
              </MenuContainerOverlay>
            </Overlay>
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