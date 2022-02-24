import React from "react"
import { Helmet } from 'react-helmet'
// components
import Layout from "../components/Layout"
// styles
import styled from "@emotion/styled"
import { css } from "@emotion/react"
const Container = styled.section`
  max-width:1020px;
  margin:0 auto;
`

export default function Home() {
  return(
    <Layout>
      <Helmet title="Home"/>
      <Container>
        <p>hello</p>
      </Container>
    </Layout>
  )
}
