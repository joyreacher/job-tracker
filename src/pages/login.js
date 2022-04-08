import React, { useEffect } from "react"
import { Helmet } from 'react-helmet'
// components
import Layout from "../components/Layout"
// styles
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import LoginForm from "../components/LoginForm"
import Navbar from "../components/Navbar"
import Seo from "../components/Seo"
const Container = styled.section`
  height:100%;
  max-width:1020px;
  margin:0 auto;
`
const Headline =styled.h1`
  text-align:center;
`
function Login() {
  return (
    <Layout>
      <Seo
          title="Login"
          description="Login to use Jobby"
          lang="en"
        />
        <Navbar/>
      <Container>
        <Headline>Login</Headline>
        <LoginForm />
      </Container>
    </Layout>
  )
}

export default Login