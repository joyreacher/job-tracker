import React, { useRef, useContext, useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { CSVLink, CSVDownload } from 'react-csv'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
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
import JobView from '../components/jobs/JobView'
// styles
import styled from "@emotion/styled"
import { jsx, css, keyframes } from "@emotion/react"
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCoffee, faHouseLaptop, faPeopleArrows, faPhone } from '@fortawesome/free-solid-svg-icons'
gsap.registerPlugin(Flip);

const breakpoints = [376, 411, 576, 768, 845, 1057, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)
const Container = styled.section`
  display:flex;
  justify-content: space-between;
  max-width:1020px;
  margin:0 auto;
  padding: 0 2em;
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap:1vw;
  grid-row-gap: 1.75em;
  padding:1em 0 1em 1em;
  ${mq[6]}{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  ${mq[5]}{
    
  grid-template-columns: 1fr 1fr 1fr;
  }
  ${mq[4]}{
    
    grid-template-columns: 1fr 1fr;
  }
  ${mq[2]}{
    padding:1em;
    grid-template-columns: 1fr;
  }
  ${mq[0]}{
    
    
  }
  
`
const CheckBoxContainer = styled.div`
  display:flex;
  justify-content: center;
  justify-self:flex-start;
`
const FilterList = styled.ul`
  height:500px;
  color:black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-flow:column;
  border-radius: 10px;
  background: var(--color-main-light);
  box-shadow: -2px -2px 5px var(--color-morph-light),
            3px 3px 5px var(--color-morph-dark);
  ${mq[4]}{
    height:auto;
    flex-flow:row;
  }
`
const ListItem = styled.li`
  position: relative;
  list-style: none;
  text-align: center;
  margin: 15px;
  ${mq[0]}{
    margin:5px;
  }
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
  background: var(--color-main-light);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -2px -2px 5px var(--color-morph-light),
        3px 3px 5px var(--color-morph-dark);
  border-radius: 10px;
  
`
const JobCardContainer = styled.div`
  justify-self: flex-end;
  overflow-y:hidden;
  cursor:pointer;
  width:200px;
  height:200px;
  background: var(--color-morph-light);
  box-shadow: -2px -2px 5px var(--color-morph-light),
        3px 3px 5px var(--color-morph-dark);
  transition: background-color .25s ease, color .30s ease-in;
  &:hover{
    background-color:red;
    color:var(--color-main-light);
    animation-play-state: running;
  }
  ${mq[4]}{
    justify-self:center;
    width: 80%;
  }
  ${mq[2]}{
    justify-self:center;
  }
`
const JobInnerContainer = styled.section`
  padding:1.2rem;
  position:relative;
  overflow:hidden;
`
const JobCardCompanyTitle= styled.h1`
  font-size:clamp(1.2rem, 3vw, 1.8rem);
  position:relative;
  z-index:4;
`
const Line = styled.span`
  background-color: var(--color-main-light);
  height: 4px;
  position:absolute;
  width:0;
  top:50px;
  left:20px;
`
const JobCardBody = styled.div`
  padding:2em 0;
  position:relative;
  z-index:4;
`
const JobCardCopy = styled.p`
  font-size: clamp(1rem, 2vw, 1.1rem);
`
const Conceal = styled.div`
  position:absolute;
  background-color: var(--color-main-light);
  height:200px;
  width:100%;
  z-index: -1;
  top:0;
  left:0;
`
const LoaderContainer = styled.div`
  margin:2em 0;
  min-height:10vw;
  position:absolute;
  top:50%;
  left:50%;
`
const JobCardFooter = styled.div`

`
const DeleteUIContainer = styled.div`
  color:var(--color-main-light);
  font-family: serenity;
  background: var(--color-main-danger);
  height: 25vw;
  width: 50vw;
  display:flex;
  
  justify-content: center;
  align-items:center;
`
const DeleteUIInner = styled.div`
  display:block;
  width: 80%;
`
const DeleteButton = styled.button`
  cursor: pointer;
  width: 50%;
  transition: background-color .25s ease, color .30s ease-in;
  &:hover{
    background-color:red;
    color:var(--color-main-light);
    animation-play-state: running;
  }
`
const DeleteCancelButton = styled.button`
  cursor: pointer;
  width: 50%;
  transition: background-color .25s ease, color .30s ease-in;
  &:hover{
    background-color:var(--color-main-success);
    color:var(--color-main-light);
    animation-play-state: running;
  }
`
`
const DeleteUICopy = styled.div`
  margin: 1em 0;
`
const DeleteActionContainer = styled.div`
  margin-top:2em;
`
const tl = gsap.timeline({ reversed: true, paused:true})
const jobViewTL = gsap.timeline({ reversed: true, paused: true})
//filter button animations
const appliedFilterTl = gsap.timeline({paused:true, reversed: true})
const phoneScreenFilterTl = gsap.timeline({paused:true, reversed: true})
const interviewFilterTl = gsap.timeline({paused:true, reversed: true})
const thaFilterTl = gsap.timeline({paused:true, reversed: true})
const menuTl = gsap.timeline({paused: true, reversed:true})
export default function Home() {
  const isBrowser = () => typeof window !== "undefined"
  let startHeight = isBrowser() ? gsap.getProperty(".job-container", "height") : '';
  const [jobView, setJobView] = useState()
  const {state, dispatch} = useContext(DataContext)
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [checkboxValues, setCheckboxValues] = useState({})
  
  const [filter, setFilter] = useState([]);
  const cardRef = useRef(null)
  const elements = useRef([]);
  const refCheckbox = useRef(false);
  const filtersInitArray = filter.map((e) => e.value);
  filtersInitArray.shift();
  let cardExitTime = 0
  const cardHoverTl = gsap.timeline({paused:true, reversed: true})
  const checkForToken = () => {
    if(isBrowser()){
    return localStorage.getItem('token')
    }else{
      return
    }
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
        filterAnimationsInit()
        flipInit()
      })
    )
  }
  const JobUpdateCall = (e) => {
    console.log(e)
    console.log(jobView[0])
    // return e
    const token = localStorage.getItem('token')
    trackPromise(
      axios({
        url: `https://job-tracker-api-v1.herokuapp.com/jobs/update`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json;charset=UTF-8',
          "Authorization" : `Bearer ${token}`
        },
        data:{
          jobId: e[1],
          user: localStorage.getItem('username'),
          company: e[0] === 'company' ? e[2] : jobView[0].company,
          role: e[0] === 'role' ? e[2] : jobView[0].role === "" ? 'no role info': jobView[0].role,
          contact: e[0] === 'contact' ? e[2] : (jobView[0].contact === "" ? 'no contact info': jobView[0].contact),
          location: e[0] === 'location' ? e[2] : jobView[0].location,
          source: e[0] === 'source' ? e[2] : jobView[0].source,
          link: e[0] === 'link' ? e[2] : jobView[0].link,
          notes: e[0] === 'notes' ? e[2] : jobView[0].notes,
          dateAdded: jobView[0].dateAdded,
        }
      })
      .then(res => {
          
          setJobView([res.data])
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
    elements.current.forEach((el)=> {
      if(!matches.length){
        el.style.display = 'inline-flex'
      }
      for(let x = 0; x < matches.length; x++){
        if(el.getAttribute(`data-${matches[x].id}`)){
          el.style.display = 'inline-flex'
        }
        else {
          el.style.display = 'none'
        }
      }
    })
    let endHeight = gsap.getProperty('.job-container', 'height')
    // Create the animation
    let flip = Flip.from(state, {
      duration: 1,
      scale: true,
      absolute: true,
      ease: "power1.inOut",
      onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: 1}),
      onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 1})
    });
    flip.fromTo('.job-container', {
      height: startHeight
    }, {
      height: endHeight,
      clearProps: 'height',
      duration: flip.duration(),
      ease:'power3.inOut'
    }, 0)
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
  const handleStageSelect = (type) => {
    StageUpdateCall(type)
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
          toast.success('you added a job')
          return ApiCall()
        })
        .catch((error) =>{
          console.log(error)
          return toast.error('Something went wrong')
        })
        
    )
    
  }
  const submit = (e) =>{
    const job = filterById(e)
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteUIContainer className='custom-ui'>
            <DeleteUIInner>
            <h1>Are you sure?</h1>
            <DeleteUICopy>You want to delete <Highlight>{job[0].company}</Highlight></DeleteUICopy>
            <DeleteActionContainer>
              <DeleteCancelButton onClick={onClose}>No</DeleteCancelButton>
              <DeleteButton
                onClick={() => {
                  deleteJob(e);
                  onClose();
                }}
              >
                Yes, Delete it!
              </DeleteButton>
            
            </DeleteActionContainer>
            
            </DeleteUIInner>
          </DeleteUIContainer>
        );
        },
    })
  }
  const deleteJob = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    trackPromise(
      axios({
        url: 'https://job-tracker-api-v1.herokuapp.com/jobs/delete',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json;charset=UTF-8',
          "Authorization": `Bearer ${token}`
        },
        data: {
          jobId: e.target.id,
          user: localStorage.getItem('username'),
        },
      })
        .then(response => {
          console.log(response)
          toast.success('You deleted a job')
        })
        .catch((error) => {
          console.log(error)
          return toast.error('Could not delete job')
        })
        .then(() =>{
          return ApiCall()
        })
    )
  }
  useEffect(() =>{
    if(!checkForToken() || !checkForToken() === undefined){
      window.location.href = '/login'
    }
    (async function fetchData(){
      await ApiCall()
      })()
  }, [filter, jobView])
  
  
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
        <Navbar menuTl={menuTl} jobs={jobs} timeline={tl} handleClick={handleClick} token={checkForToken()}/>
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
                    onClick={() => clickFilter('applied')}
                  />
                  <IconBox id="applied">
                    <FontAwesomeIcon  icon={faBriefcase} />
                  </IconBox>
                </Label>
              </ListItem>
              
              <ListItem>
                <Label className="form-check-label" htmlFor="phonescreen" >
                  <CheckBox
                    name="phonescreen"
                    value="phonescreen"
                    className="form-check-input"
                    type="checkbox"
                    onChange={filterChangeHandler}
                    onClick={() => clickFilter('phoneScreen')}
                  />
                  <IconBox id="phoneScreen">
                    <FontAwesomeIcon icon={faPhone} />
                  </IconBox>
                </Label>
              </ListItem>
              
              <ListItem>
                <Label className="form-check-label" htmlFor="facetoface" >
                  <CheckBox
                    name="facetoface"
                    value="facetoface"
                    className="form-check-input"
                    type="checkbox"
                    onChange={filterChangeHandler}
                    onClick={() => clickFilter('interview')}
                  />
                  <IconBox id="interview">
                    <FontAwesomeIcon icon={faPeopleArrows} />
                  </IconBox>
                </Label>
              </ListItem>
              
              <ListItem>
                <Label className="form-check-label" htmlFor="tha" >
                  <CheckBox
                    name="tha"
                    value="tha"
                    className="form-check-input"
                    type="checkbox"
                    onChange={filterChangeHandler}
                    onClick={() => clickFilter('tha')}
                  />
                  <IconBox id="tha">
                    <FontAwesomeIcon icon={faHouseLaptop} />
                  </IconBox>
                </Label>
              </ListItem>
              

            </FilterList>
            </CheckBoxContainer>
            <LoaderContainer>
          <LoadingSpinnerComponent />
            </LoaderContainer>
          <JobContainer className="job-container">
            <JobView 
              refCheckbox={refCheckbox}
              checkboxValues={checkboxValues} 
              handleStageSelect={handleStageSelect} 
              StageUpdateApiCall={StageUpdateCall} 
              handleJobView={handleJobView} 
              jobViewTL={jobViewTL} 
              jobs={jobs} 
              jobView={jobView}
              JobUpdateCall={JobUpdateCall}
              />
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
                      
                    >
                      <JobInnerContainer id={job._id}>
                        <JobCardCompanyTitle id={job._id}>
                          {job.company}
                        </JobCardCompanyTitle>
                        <JobCardBody id={job._id}>
                          <JobCardCopy id={job._id}>
                            {job.role}
                          </JobCardCopy>
                          <JobCardFooter>
                            <button
                              id={job._id}
                              onClick={ (e) => {
                                filterById(e)
                                handleJobView(e)
                                }}
                            >
                              Info
                            </button>
                            <button
                            id={job._id}
                              onClick={ (e) => {
                                submit(e)
                                }}
                            >
                              Delete
                            </button>
                          </JobCardFooter>
                        </JobCardBody>
                      </JobInnerContainer>
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
