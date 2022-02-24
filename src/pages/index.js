import React from "react"
import { Helmet } from 'react-helmet'
import styled from "@emotion/styled"
import { css } from "@emotion/react"

const Container = styled.div`
  margin:3em auto;
  max-width:990px;
  background-color: red;
`

export default function Home() {
  return(
    <Container>
      <Helmet title="Home"/>
      <p>hello</p>
    </Container>
  )
}
