import React, { useEffect } from "react"
import { Helmet } from 'react-helmet'
// components
import Layout from "../components/Layout"
// styles
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import RegisterForm from "../components/RegisterForm"
const Section = styled.section`
  margin:0 auto;
  height:100%;
  max-width:1020px;
`
function Register() {
  return (
    <Layout>
      <Helmet title="Register" />
      <Section>
        <RegisterForm />
      </Section>
    </Layout>
  )
}

export default Register