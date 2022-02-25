import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { Toaster } from "react-hot-toast"

const NavbarContainer = styled.nav`
  display:flex;
  justify-content: center;
  align-items:center;
  height:15vh;
  font-size: 2.5rem;
  margin-bottom: 3rem;
`
function Navbar() {
  return (
    <NavbarContainer>
      <Toaster />
      <p>Jobz</p>
    </NavbarContainer>
  )
}

export default Navbar