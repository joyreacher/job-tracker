import React from "react"
import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import Navbar from "./Navbar"

const Wrapper = styled("main")`
    font-size: clamp(1.2rem, .5vw, 1.5rem);
    color: black;
`

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Global
        styles={css`
          div {
            
          }
        `}
      />
      <Navbar />
      {children}
    </Wrapper>
  )
}