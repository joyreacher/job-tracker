import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { Toaster } from "react-hot-toast"

const NavbarContainer = styled.nav`
  display:flex;
  justify-content: space-around;
  align-items:center;
  height:15vh;
  font-size: 2.5rem;
  margin-bottom: 3rem;
`
const LogOutLink = styled.p`
  cursor: pointer;
`
function Navbar() {
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('jobs')
    return window.location.href = '/login'
  }
  useEffect(() =>{
    if(!localStorage.getItem('token')){
      // return window.location.href = '/login'
    }
  })
  return (
    <NavbarContainer>
      <Toaster />
      <p>Jobz</p>
      <LogOutLink onClick={() => logout()}>logout</LogOutLink>
    </NavbarContainer>
  )
}

export default Navbar