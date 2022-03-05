import React, { useEffect } from "react"
import { Helmet } from 'react-helmet'
// components
import Layout from "../components/Layout"
// styles
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import LoginForm from "../components/LoginForm"
const Container = styled.section`
  height:100%;
  max-width:1020px;
  margin:0 auto;
`
function Register() {
  return (
    <Layout>
      <Helmet 
        title="Login" 
        description="Login to view your saved jobs" 
        lang="US-en"
      />
      <Container>
        <LoginForm />
      </Container>
    </Layout>
  )
}

export default Register