import React, { useContext, useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
import toast from "react-hot-toast";
import gsap  from "gsap";
import { CSVLink, CSVDownload } from 'react-csv'
// Context
import {DataContext} from "../context/DataContext";
// components
import { LoadingSpinnerComponent } from "../components/Spinner";
import Layout from "../components/Layout"
import AllJobs from "../components/jobs/AllJobs";
import SEO from "../components/Seo";
import Navbar from "../components/Navbar";
import ApplicationForm from "../components/ApplicationForm";
import Stage from "../components/stages/Stage";
// styles
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/react"


const breakpoints = [376, 411, 576, 768, 845, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)
const Container = styled.section`
  display:flex;
  flex-direction: column;
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
const tl = gsap.timeline({ reversed: true, paused:true})
const jobViewTL = gsap.timeline({ reversed: true, paused: true})
const fliterTl = gsap.timeline({paused:true, reversed: true})

export default function Home() {
  const {state, dispatch} = useContext(DataContext)
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsloading] = useState(true)
  
  const [filter, setFilter] = useState([]);
  const elements = useRef([]);
  const filtersInitArray = filter.map((e) => e.value);
  filtersInitArray.shift();
  
  const checkForToken = () => {
    return localStorage.getItem('token')
  }

  const ApiCall = async () => {
    const token = checkForToken()
    await trackPromise(
      axios({
        url: `https://job-tracker-api-v1.herokuapp.com/jobs/${state.user}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json;charset=UTF-8',
          "Authorization" : `Bearer ${token}`
        },
      })
      .then(response => {
        return setJobs(response.data)
      })
      .catch((error) => {
        return toast.error(error.message)
      })
      .then(() => {
        setIsloading(false)
      })
        flipInit()
    )
  }

  const flipInit = () => {
    const state = Flip.getState(elements.current);
    
    const matches = filter.map((filter) => {
      if(filter.id !== undefined){
        return filter
      }
    })
    elements.current.forEach((el, i)=> {
      if(!matches.length ){
        el.style.display = 'inline-flex'
      }else if(el.getAttribute(`data-${matches[0].id}`)){
        return el.style.display = 'inline-flex'
      }else {
        el.style.display = 'none'
      }
    })
    // Create the animation
    Flip.from(state, {
      duration: 1,
      scale: true,
      absolute: true,
      ease: "power1.inOut",
      onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: 1}),
      onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 1})
    });
  }
  const handleClick = async () => {
    if(tl.reversed()){
      return tl.play()
    }else{
      return tl.reverse()
    }
  }
  const handleJobView = async (element) => {
    if(jobViewTL.reversed()){
      return jobViewTL.play()
    }else{
      return jobViewTL.reverse()
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    trackPromise(
      axios({
        url: 'https://job-tracker-api-v1.herokuapp.com/jobs/new',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json;charset=UTF-8',
          "Authorization" : `Bearer ${token}`
        },
        data: {
          user: localStorage.getItem('username'),
          company: e.target[0].value,
          role: e.target[1].value,
          contact: e.target[2].value,
          location: e.target[3].value,
          source: e.target[4].value,
          link: e.target[5].value,
          notes: e.target[6].value,
          dateAdded: e.target[7].value
        },
      })
        .then(response => {
          console.log(response.data.applications)
          toast.success('you did it')
          return ApiCall()
        })
        .catch((error) =>{
          console.log(error)
          return toast.error('Something went wrong')
        })
        
    )
    
  }
  const filterJobs = (e) => {
      document.querySelectorAll('.job-row').forEach((job) => {
        gsap.set(job, { display:'block' })
        job.classList.remove('filtered')
        document.querySelectorAll('.option').forEach((filter) => {
          //? if the rows data- attribute does NOT match what is passed hide it
          if(!job.getAttribute('data-' + e)){
            gsap.set(job, { display: 'none'})
            job.classList.add('filtered')
          }
        })
      })
  }
  useEffect(() =>{
    if(!checkForToken() || !checkForToken() === undefined){
      window.location.href = '/login'
    }
    (async function fetchData(){
      await ApiCall()
      })()
  }, [])
  
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
        <Navbar jobs={jobs} timeline={tl} handleClick={handleClick} token={checkForToken()}/>
        <ApplicationForm handleClick={handleClick} handleSubmit={handleSubmit}/>
        
        <Container>
          <Stage filterJobs={filterJobs} clearFilters={clearFilters}/>
          <LoadingSpinnerComponent />
          {isLoading !== true ? <AllJobs handleJobView={handleJobView} jobViewTL={jobViewTL} jobs={jobs} /> : <LoadingMessage />}
        </Container>
      </Layout>
    )
  }
}
