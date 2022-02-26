import React, { useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
// components
import { LoadingSpinnerComponent } from "../components/Spinner";
import Layout from "../components/Layout"
import ApplicationForm from "../components/ApplicationForm"
import AllJobs from "../components/jobs/AllJobs";
// styles
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import toast from "react-hot-toast";
const Container = styled.section`
  max-width:1020px;
  margin:0 auto;
`

export default function Home() {
  const [jobs, setJobs] = useState('')
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
        <ApplicationForm token={checkForToken()}/>
        <LoadingSpinnerComponent />
        <AllJobs jobs={jobs} />
      </Container>
    </Layout>
  )
}
