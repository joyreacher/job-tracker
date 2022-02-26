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
  const checkForToken = () => {
    const token = localStorage.getItem('token')
    return token
  }
  useEffect(() =>{
    
    if(!checkForToken() || !checkForToken() === undefined){
      return window.location.href = '/login'
    }else{
      const token = checkForToken()
      trackPromise(
        axios({
          url: 'https://jobz-api.herokuapp.com/jobs',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json;charset=UTF-8',
            "Authorization" : `Bearer ${token}`
          },
          // data: {
          //   Username: e.target[0].value,
          //   Password: e.target[1].value
          // }
        })
        .then(response => {
          setJobs(JSON.stringify(response.data))
          console.log(jobs)
        })
        .catch((error) => {
          return toast.error('whoa something happened')
        })
      )
    }
    
  },[])
  return(
    <Layout>
      <Helmet title="Home"/>
      <Container>
        <p>hello</p>
      </Container>
    </Layout>
  )
}
