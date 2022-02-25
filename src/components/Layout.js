import React from "react"
import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import Navbar from "./Navbar"

const Wrapper = styled("main")`
    color: var(--color-main-light);
    background-color: var(--color-main-dark);
    min-height: 100vh;
    font-size: clamp(1.2rem, .5vw, 1.5rem);
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