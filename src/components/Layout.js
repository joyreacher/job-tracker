import React from "react"
import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import Navbar from "./Navbar"

const Wrapper = styled("main")`
  
`

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Global
        styles={css`
          div {
            font-size: clamp(1.2rem, .5vw, 1.5rem);
            max-width: 1020px;
            margin: 0 auto;
            color: black;
          }
        `}
      />
      <Navbar />
      {children}
    </Wrapper>
  )
}