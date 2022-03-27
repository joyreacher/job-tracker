import React, { useRef, useContext, useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
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
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCoffee, faHouseLaptop, faPeopleArrows, faPhone } from '@fortawesome/free-solid-svg-icons'
gsap.registerPlugin(Flip);

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
const JobContainer = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap:2em;
`
const CheckBoxContainer = styled.div`
  display:flex;
  justify-content: center;
`
const FilterList = styled.ul`
  color:black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  padding: 20px;
  background: #ebf5fc;
  box-shadow: -2px -2px 5px var(--color-main-light),
            3px 3px 5px var(--color-main-dark);
`
const ListItem = styled.li`
  position: relative;
  list-style: none;
  text-align: center;
  margin: 15px;
`
const Label = styled.label`
  position: relative; 
  cursor: pointer;
`
const CheckBox = styled.input`
  height:3rem;
  width:2rem;
  left:-1rem;
  cursor:pointer;
  z-index:5;
  position: absolute;
  opacity: 0;
`
const IconBox = styled.div`
  width: 60px;
  height: 60px;
  background: #ebf5fc;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
        3px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
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
      .then(() =>{
        fliterTl.to('#icon-box', {
          ease:'none',
          duration:.25,
          boxShadow: `inset -2px -2px 5px rgba(255, 255, 255, 1),
          inset 3px 3px 5px rgba(0, 0, 0, 0.1)`
        })
        flipInit()
      })
    )
  }
  const StageUpdateCall =  (e) => {
    // checked will be the opposite state from what it was set to; example: if it returns false, it was true.
    const checked = e.target.checked
    const name = e.target.id
    let setNewDate
    
    // TODO: Tighten up the condition 
    if(checked){
      setNewDate = new Date()
      if(name === 'applied'){
        jobView[0].stage.applied = true
      }
      if(name === 'phoneScreen'){
        jobView[0].stage.phoneScreen = true
      }
      if(name === 'tha'){
        
        jobView[0].stage.takeHomeAssignment.dateReceived = setNewDate
        console.log(jobView[0].stage.takeHomeAssignment)
      }
      if(name === 'faceToface'){
        jobView[0].stage.faceToface = true
      }
    }else if(!checked){
      setNewDate = ''
      if(name === 'applied'){
        jobView[0].stage.applied = ''
      }
      if(name === 'phoneScreen'){
        jobView[0].stage.phoneScreen = ''
      }
      if(name === 'tha'){
        jobView[0].stage.takeHomeAssignment.dateReceived = ''
      }
      if(name === 'faceToface'){
        jobView[0].stage.faceToface = ''
      }
    }
    //TODO: END CONDITION
    
    
    const token = localStorage.getItem('token')
    trackPromise(
      axios({
        url: `https://job-tracker-api-v1.herokuapp.com/jobs/update/${jobView[0]._id}`,
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json;charset=UTF-8',
          "Authorization" : `Bearer ${token}`
        },
        data:{
          id:jobView[0]._id,
          applied:name === 'applied' ? setNewDate : jobView[0].stage.applied,
          phoneScreen: name === 'phoneScreen' ? setNewDate : jobView[0].stage.phoneScreen,
          receivedTHA: name === 'tha' ? checked : jobView[0].stage.takeHomeAssignment.received,
          dateReceivedTHA: name === 'tha' ? setNewDate : jobView[0].stage.takeHomeAssignment.dateReceived,
          faceToface: name === 'faceToface' ? setNewDate : jobView[0].stage.faceToface,
          result: ''
        }
      })
      .then(res => {
          setJobView([res.data])
      })
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

  const filterChangeHandler = ({ target }) => {
    const { value, checked } = target;
      if (checked) {
        setFilter([].concat(filter, {id: value}));
      } else {
        setFilter(filter.filter(e => e.id !== value));
      }
  };

  const setRefs = (e, i) => {
    const { current } = elements;
    current[i] = e;
  };
  const filterAnimationsInit = () =>{
    appliedFilterTl.to('#applied', {
      ease:'linear',
      duration:.025,
      boxShadow: `inset -2px -2px 5px rgba(255, 255, 255, 1),
      inset 3px 3px 5px rgba(0, 0, 0, 0.1)`
    })
    phoneScreenFilterTl.to('#phoneScreen', {
      ease:'linear',
      duration:.025,
      boxShadow: `inset -2px -2px 5px rgba(255, 255, 255, 1),
      inset 3px 3px 5px rgba(0, 0, 0, 0.1)`
    })
    interviewFilterTl.to('#interview', {
      ease:'linear',
      duration:.025,
      boxShadow: `inset -2px -2px 5px rgba(255, 255, 255, 1),
      inset 3px 3px 5px rgba(0, 0, 0, 0.1)`
    })
    thaFilterTl.to('#tha', {
      ease:'linear',
      duration:.025,
      boxShadow: `inset -2px -2px 5px rgba(255, 255, 255, 1),
      inset 3px 3px 5px rgba(0, 0, 0, 0.1)`
    })
  }
  const clickFilter = (timeline) => {
    if(timeline === 'applied'){
      if(appliedFilterTl.reversed()){
        return appliedFilterTl.play()
    }else{
        return appliedFilterTl.reverse()
      }
    }
    else if(timeline === 'phoneScreen'){
      if(phoneScreenFilterTl.reversed()){
        return phoneScreenFilterTl.play()
      }else{
        return phoneScreenFilterTl.reverse()
      }
    }
    else if(timeline === 'interview'){
      if(interviewFilterTl.reversed()){
        return interviewFilterTl.play()
      }else{
        return interviewFilterTl.reverse()
      }
    }
    else if(timeline === 'tha'){
      if(thaFilterTl.reversed()){
        return thaFilterTl.play()
      }else{
        return thaFilterTl.reverse()
      }
    }

  }
  const handleClick = async () => {
    if(tl.reversed()){
      return tl.play()
    }else{
      return tl.reverse()
    }
  }
  const filterById = (e) => {
    let result = jobs.filter((item) => {
      if(item._id !== e.target.id){
        return false
      }else{
        
        return item
      }
    })
    setJobView(result)
    return result
  }
  const handleJobView =  async (e) => {
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
  }, [filter])
  
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
        {/* TODO: Listitems can be put in array/function to render */}
        <CheckBoxContainer className="form-check form-check-inline" >
            <FilterList>
              <ListItem>
                <Label className="form-check-label" htmlFor="applied" >
                  <CheckBox
                    name="applied"
                    value="applied"
                    className="form-check-input"
                    type="checkbox"
                    onChange={filterChangeHandler}
                    onClick={() => clickFilter()}
                  />
                  <IconBox id="applied">
                    <FontAwesomeIcon  icon={faBriefcase} />
                  </IconBox>
                </Label>
              </ListItem>
              
              <ListItem>
                <Label className="form-check-label" htmlFor="phonescreen" >
                  <input
                    name="phonescreen"
                    value="phonescreen"
                    className="form-check-input"
                    type="checkbox"
                    onChange={filterChangeHandler}
                  />
                  <IconBox id="phoneScreen">
                    <FontAwesomeIcon icon={faPhone} />
                  </IconBox>
                </Label>
              </ListItem>
              
              <ListItem>
                <Label className="form-check-label" htmlFor="facetoface" >
                  <input
                    name="facetoface"
                    value="facetoface"
                    className="form-check-input"
                    type="checkbox"
                    onChange={filterChangeHandler}
                  />
                  <IconBox id="interview">
                    <FontAwesomeIcon icon={faPeopleArrows} />
                  </IconBox>
                </Label>
              </ListItem>
              
              <ListItem>
                <Label className="form-check-label" htmlFor="tha" >
                  <input
                    name="tha"
                    value="tha"
                    className="form-check-input"
                    type="checkbox"
                    onChange={filterChangeHandler}
                  />
                  <IconBox id="tha">
                    <FontAwesomeIcon icon={faHouseLaptop} />
                  </IconBox>
                </Label>
              </ListItem>
              

            </FilterList>
            </CheckBoxContainer>
          <LoadingSpinnerComponent />
          <JobContainer>
            {
              jobs.map((job, i) => {
                return (
                    <JobCardContainer
                      className={`filter-element ${job.company}`}
                      data-applied={!job.stage.applied ? '' : 'true'}
                      data-phonescreen={!job.stage.phoneScreen ? '' : 'true'}
                      data-facetoface={!job.stage.faceToface ? '' : 'true'}
                      data-tha={!job.stage.takeHomeAssignment.received ? '' : 'true'}
                      id={job._id}
                      key={job._id}
                      ref={el => {
                        setRefs(el, i)
                        }}
                      onMouseEnter={(e) => {
                        cardRef.current = e.currentTarget
                        onEnter(e)  
                        console.log(cardHoverTl.time() < cardExitTime)
                        if(cardHoverTl.isActive() && cardHoverTl.time() <= cardHoverTl.progress(.5)){
                          cardHoverTl.timeScale(2).tweenTo('conceal')
                        }
                        if(cardHoverTl.time() < cardExitTime){
                          cardHoverTl.play()
                        }else{
                          // restart if the whole animation is played on reenter
                          cardHoverTl.restart()
                        }
                      }}
                      onMouseLeave={(e) =>{
                        if(cardHoverTl.time() < cardExitTime){
                          cardHoverTl.reverse().timeScale(2).then(() => {
                            cardHoverTl.clear()
                          })
                          
                        }else{
                          // restart if the whole animation is played on reenter
                          cardHoverTl.play().timeScale(2).tweenFromTo('conceal')
                        }
                      }}
                      onClick={ (e) => {
                        cardHoverTl.reverse()
                        // onLeave(e)
                        filterById(e)
                        handleJobView(e)
                        }}
                    >
                      <JobInnerContainer id={job._id}>
                        <JobCardCompanyTitle id={job._id}>
                          {job.company}
                        </JobCardCompanyTitle>
                        <Line className={`line-${job._id}`}></Line>
                        <JobCardBody id={job._id}>
                          <JobCardCopy id={job._id}>
                            {job.role}
                          </JobCardCopy>
                        </JobCardBody>
                      </JobInnerContainer>
                      <Conceal id={job._id} className={`conceal-${job._id}`}></Conceal>
                    </JobCardContainer>
                      )
              })
            }
          </JobContainer>
        </Container>
      </Layout>
    )
  }
}
