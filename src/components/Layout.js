import React from "react"
import { DataProvider } from "../context/DataContext"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Navbar from "./Navbar"
import Footer from "./Footert"

const Wrapper = styled("main")`
    color: var(--color-main-light);
    background-color: var(--color-main-dark);
    min-height: 100vh;
    font-size: clamp(1.2rem, .5vw, 1.5rem);
    font-family: serenity, sans-serif;
    padding-bottom:3em;
    margin-bottom:100px;
`

export default function Layout({ children }) {
  return (
    <DataProvider>
      <Wrapper>
        {children}
      </Wrapper>
      <Footer />
    </DataProvider>
  )
}