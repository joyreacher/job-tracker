import React, { useEffect } from "react"
import styled from "@emotion/styled"

const NavbarContainer = styled.nav`
  display:block;
  background-color: green;
`
function Navbar() {
  return (
    <NavbarContainer>
      <p>navbar</p>
    </NavbarContainer>
  )
}

export default Navbar