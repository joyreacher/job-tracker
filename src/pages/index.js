import React, { useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
import toast from "react-hot-toast";
// components
import { LoadingSpinnerComponent } from "../components/Spinner";
import Layout from "../components/Layout"
import ApplicationForm from "../components/ApplicationForm"
import AllJobs from "../components/jobs/AllJobs";
import SEO from "../components/Seo";
// styles
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/react"
const breakpoints = [376, 411, 576, 768, 845, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)
const Container = styled.section`
  padding: 0 2em;
  display:flex;
  justify-content: space-between;
  max-width:1020px;
  margin:0 auto;
  ${mq[4]}{
    flex-direction: column;
  }
`
const LoadingMessage = styled.div`
  color:white;
  background-color: var(--color-main-dark);
  height: 100vh;
  width:100vw;
  display:flex;
  flex-direction:column;  
  justify-content: center;
  align-items: center;
`
export default function Home() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const checkForToken = () => {
    return localStorage.getItem('token')
  }
  const ApiCall = async () => {
    const token = checkForToken()
    trackPromise(
      axios({
        url: 'https://job-tracker-api-v1.herokuapp.com/jobs',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json;charset=UTF-8',
          "Authorization" : `Bearer ${token}`
        },
      })
      .then(response => {
        setJobs(response.data)
      })
      .catch((error) => {
        return toast.error(error.message)
      })
      .then(() => {
        console.log('set false')
        setIsloading(false)
      })
    )
  }
  useEffect(async () =>{
    if(!checkForToken() || !checkForToken() === undefined){
      window.location.href = '/login'
    }
    await ApiCall()
  },[])
  
  if(isLoading === true || !checkForToken() || checkForToken() === undefined){
    return(
      <LoadingMessage> 
        <h1>Loading</h1>
        <LoadingSpinnerComponent />
      </LoadingMessage>
    )
    
  }else if(!isLoading && checkForToken()){
    return(
      <Layout>
        <SEO 
          title="Home" 
          description="View the latest jobs saved" 
          lang="US-en"
          />
        <LoadingSpinnerComponent />
        <Container>
          { isLoading !== true ? <AllJobs jobs={jobs} /> : <LoadingMessage />}
        </Container>
      </Layout>
    )
  }
  
}
