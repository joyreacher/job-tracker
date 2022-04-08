import React, { useEffect } from "react"
import { Helmet } from 'react-helmet'
// components
import Layout from "../components/Layout"
import Seo from '../components/Seo'
import Navbar from "../components/Navbar"
// styles
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import RegisterForm from "../components/RegisterForm"
const Section = styled.section`
  margin:0 auto;
  height:100%;
  max-width:1020px;
`
const Headline = styled.h1`
  text-align:center;
`
function Register() {
  return (
    <Layout>
    <Seo
          title="Register"
          description="Register to use Jobby"
          lang="en"
        />
      <Navbar />
      <Section>
        <Headline>Register</Headline>
        <RegisterForm />
      </Section>
    </Layout>
  )
}

export default Register