import React, { useEffect } from "react"
import { Helmet } from 'react-helmet'
// components
import Layout from "../components/Layout"
// styles
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import RegisterForm from "../components/RegisterForm"
const Container = styled.section`
  height:100%;
  max-width:1020px;
`
function Register() {
  return (
    <Layout>
      <Helmet title="Register" />
      <Container>
        <RegisterForm />
      </Container>
    </Layout>
  )
}

export default Register