import React, { useEffect } from "react"
import styled from "@emotion/styled"

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
      <p>Jobz</p>
    </NavbarContainer>
  )
}

export default Navbar