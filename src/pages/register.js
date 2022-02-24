import React, { useEffect } from "react"
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
function Register() {
  return (
    <Layout>
      <Helmet title="Register" />
      <Container>
        register
      </Container>
    </Layout>
  )
}

export default Register