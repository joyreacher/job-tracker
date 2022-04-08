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
import Seo from "../components/Seo";
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
import Moment from "react-moment";
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
  height:3.75rem;
  width:3.5rem;
  left:-1.75rem;
  cursor:pointer;
  z-index:5;
  position: absolute;
  opacity: 0;
  transform-origin: center center;
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
  width:200px;
  height:200px;
  background: var(--color-morph-light);
  box-shadow: -2px -2px 5px var(--color-morph-light),
        3px 3px 5px var(--color-morph-dark);
  transition: background-color .25s ease, color .30s ease-in;
  &:hover{
    background-color:red;
    color:var(--color-main-light);
  }
  ${mq[4]}{
    justify-self:center;
    width: 80%;
  }
  ${mq[2]}{
    justify-self:center;
    width: 100%;
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
const Highlight = styled.span`
  text-decoration: underline;
`
const DeleteUICopy = styled.div`
  margin: 1em 0;
`
const DeleteActionContainer = styled.div`
  margin-top:2em;
`
const JobCardButton = styled.button`
  margin:1em .25em 0 0;
  justify-content:center;
  text-align:center;
  font-size: clamp(1rem, 1vw, 1.5rem);
  background-color: var(--color-main-dark);
  border-radius: 7px;
  padding:.25em;
  cursor:pointer;
  color:var(--color-main-light);
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
  window.addEventListener('online', updateStatus)
  window.addEventListener('offline', updateStatus)
  let startHeight = isBrowser() ? gsap.getProperty(".job-container", "height") : '';
  const [addJobDisplay, setAddJobDisplay] = useState(false)
  const [jobView, setJobView] = useState()
  const {state, dispatch} = useContext(DataContext)
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [checkboxValues, setCheckboxValues] = useState({})
  const [offline, setOffline] = useState(false)
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
  
  const updateStatus = (event) => {
    if(navigator.onLine){
      toast.success("Your back online")
      setOffline(false)
    }else{
      toast.error("Your have lost your internet connection")
      setOffline(true)
    }
  }
  const loadLocalStorage = () => {
    if(localStorage.getItem('jobs')){
      const jobs = localStorage.getItem('jobs')
      setJobs(JSON.parse(jobs))
      setIsloading(false)
      filterAnimationsInit()
      flipInit()
    }else{
      return toast.error('Data not stored, please connect to the internet to see jobs.')
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
        localStorage.setItem('jobs', JSON.stringify(response.data))
        if(offline){
          updateStatus()
        }
        return setJobs(response.data)
      })
      .catch((error) => {
        updateStatus()
        return loadLocalStorage()
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
    const token = localStorage.getItem('token')
    if(offline){
      return toast.error('Please reconnect to the internet')
    }
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
    e.preventDefault()
    if(offline){
      return toast.error('Please reconnect to the internet')
    }
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
  const removeFalsy = (arr) => arr.filter(Boolean);
  const flipInit = () => {
    const state = Flip.getState(removeFalsy(elements.current));
    const matches = filter.map((filter) => {
      if(filter.id !== undefined){
        return filter
      }
    })
    elements.current.forEach((el)=> {
      if(el !== null){
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
      }
    })
    // Adjust the height of the container to number of elements displayed
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
  const AddJobModalHandler = async () => {
    if(tl.reversed()){
      return tl.play()
    }else{
      return tl.reverse()
    }
  }
  const handleStageSelect = (id, date, value = null) => {
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
          applied:id === 'applied' ? date : jobView[0].stage.applied,
          phoneScreen: id === 'phoneScreen' ? date : jobView[0].stage.phoneScreen,
          receivedTHA: id === 'tha' ? value : jobView[0].stage.takeHomeAssignment.received,
          dateReceivedTHA: id === 'tha' ? date : jobView[0].stage.takeHomeAssignment.dateReceived,
          faceToface: id === 'faceToface' ? date : jobView[0].stage.faceToface,
          result: ''
        }
      })
      .then(res => {
          setJobView([res.data])
      })
    )
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
  // Add job submit
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(offline){
      return toast.error('Please reconnect to the internet')
    }
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
        .then(async response => {
          toast.success('you added a job')
          if(!addJobDisplay){
            setAddJobDisplay(true)
          }else{
            setAddJobDisplay(false)
          }
          await AddJobModalHandler()
          return ApiCall()
        })
        .catch((error) =>{
          return toast.error(error.response.data)
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
  const deleteJob = async (e) => {
    e.preventDefault()
    if(offline){
      return toast.error('Please reconnect to the internet')
    }
    
    const token = localStorage.getItem('token')
    
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
      .then(async (response)=> {
        toast.success(response.data)
        elements.current.map((el, i )=> {
          if(el !== null){
            if(el.id !== e.target.id){
              return setRefs(el, i)
            }
          }
        })
        flipInit()
      })
      .then(async() =>{
        return await ApiCall()
      })
      .catch((error) => {
        return toast.error('Could not delete')
      })
      
  }
  useEffect(() =>{
    if(!checkForToken() || !checkForToken() === undefined){
      // window.location.href = 'https://www.brianthomas-develops.com/projects/jobby/login'
      window.location.href = '/login'
    }
    if(!offline){
      (async function fetchData(){
        await ApiCall()
        })()
    }else{
      updateStatus()
      loadLocalStorage()
    }
  }, [filter, jobView])
  
  
  if(isLoading === true || !checkForToken() || checkForToken() === undefined){
    return(
      <Seo
          title="Home"
          description="View the latest jobs saved"
          lang="en"
        />
      <LoadingMessage> 
        <h1>Loading</h1>
        <LoadingSpinnerComponent />
      </LoadingMessage>
    )
    
  }else if(!isLoading && checkForToken()){
    return(
      <Layout>
        <Seo
          title="Home"
          description="View the latest jobs saved"
          lang="en"
        />
          addJobDisplay={addJobDisplay} 
          setAddJobDisplay={setAddJobDisplay}
          addJobDisplay={addJobDisplay} 
          setAddJobDisplay={setAddJobDisplay}
        
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
                          <JobCardInfo>
                            Added: <Moment id={job._id} className="fromNow" fromNow>{jobs[i].dateAdded}</Moment>
                            {
                              !jobs[i].stage.applied ? '' : (<div><span>Applied: </span><Moment  fromNow>{jobs[i].stage.applied}</Moment></div>)
                            }
                            {
                              !jobs[i].stage.phoneScreen ? '' : (<div><span>Phone Screen: </span><Moment fromNow>{jobs[i].stage.phoneScreen}</Moment></div>)
                            }
                            {
                              !jobs[i].stage.faceToface ? '' : (<div><span>Interview: </span><Moment fromNow>{jobs[i].stage.faceToface}</Moment></div>)
                            }
                            {
                              !jobs[i].stage.takeHomeAssignment.dateReceived ? '' : (<div><span>Assignment: </span><Moment fromNow>{jobs[i].stage.takeHomeAssignment.dateReceived}</Moment></div>)
                            }
                            
                          </JobCardInfo>
                          <JobCardFooter>
                            <JobCardButton
                              id={job._id}
                              onClick={ (e) => {
                                gsap.to(window, {duration: 1.2, scrollTo: 0, ease:'power3.out'})
                                filterById(e)
                                handleJobView(e)
                                }}
                            >
                              Info
                            </JobCardButton>
                            <JobCardButton
                            id={job._id}
                              onClick={ (e) => {
                                submit(e)
                                }}
                            >
                              Delete
                            </JobCardButton>
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
