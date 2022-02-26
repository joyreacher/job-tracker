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
// styles
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/react"
const breakpoints = [376, 411, 576, 768, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)
const Container = styled.section`
  display:flex;
  justify-content: space-between;
  max-width:1020px;
  margin:0 auto;
  ${mq[0]}{
    flex-direction: column;
  }
`

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const checkForToken = () => {
    const token = localStorage.getItem('token')
    return token
  }
  const ApiCall = async () => {
    
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
  }
  useEffect(async () =>{
    await ApiCall()
  },[])
  return(
    <Layout>
      <Helmet title="Home"/>
      <LoadingSpinnerComponent />
      <Container>
        { isLoading !== true ? <AllJobs jobs={jobs} /> : 'loading'}
        <ApplicationForm token={checkForToken()}/>
      </Container>
    </Layout>
  )
}
