import React, { useRef, useEffect, useContext, useState } from "react"
import gsap from "gsap";
import styled from "@emotion/styled"
import {DataContext} from "../../context/DataContext";
import { jsx, css } from "@emotion/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faHouseLaptop, faPeopleArrows, faPhone } from '@fortawesome/free-solid-svg-icons'
import Moment from "react-moment";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const breakpoints = [376, 411, 576, 768, 845, 1057, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)
const InnerContainer = styled.section`
  height:100%;
  width:100%;
  color:var(--color-main-light);
`
const OverlayHeader = styled.header`
  height:10vh;
  display:flex;
  align-items:flex-start;
  justify-content:flex-end;
  padding:1em 2em;
`
const OverlayBody = styled.section`
  max-width:1020px;
  margin:0 auto;
`
const OverlayFooter = styled.div`
  font-size: clamp(1rem, 2.5vw, 2rem);
  max-width: 1020px;
  margin:2em auto 0 auto;
  display:flex;
`
const Container = styled.div`
  display:flex;
  flex-direction:column;
  div{
    margin: .5em .5em 0 .5em;
    ${mq[2]}{
      margin: .5em;
    }
  }
`
const InputCell = styled.div`
  display:flex;
  justify-content: space-around;
  align-items: center;
  padding:0 .5em;
`
const InputLabel = styled.label`
  margin:0 .5em;
`
const Checkbox = styled.input`
  cursor:pointer;
  padding:1em;
`
const Cell = styled.div`
  display:flex;
  justify-content: space-between;
  margin:.9rem 0;
  ${mq[2]}{
    justify-content: center
    flex-wrap:wrap;
    flex-direction:column;
  }
`
const CloseButton = styled.div`
  padding: 1em;
  cursor: pointer;
`
const CheckBoxContainer = styled.div`
  display:flex;
  justify-content: center;
  margin:3em auto;
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
  background: var(--color-main-dark);
`
const ListItem = styled.li`
  position: relative;
  list-style: none;
  text-align: center;
  margin: 15px;
`
const Label = styled.label`
  position: relative; 
  ${mq[2]}{
    max-width:30%;
  }
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
const IconBox = styled.span`
  top:0;
  left:-1.5em;
  width: 20px;
  height: 20px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position:absolute;
`
const OverlayMainContent = styled.section`
  padding:1em;
`
const ErrorMessage = styled.div`
  position:absolute;
  top:15%;
  right:40%;
  left:40%;
  text-align:center;
  color:red;
  p{
    width: 100%;
  }
`
const IconInstructions = styled.p`
  margin:1em auto;
  text-align:center;
`
const JobDetailHeadline = styled.h1`
  text-align: left;
  color:var(--color-main-highlight);
`
const CellLabelValue = styled.div`
  display:flex;
  justify-content:space-between;
  flex-direction:column;
  ${mq[2]}{
    width:100%;
    flex-direction:row;
  }
`
const NotesCellLabelValue = styled.div`
display:flex;
justify-content:space-between;
flex-direction:column;
${mq[2]}{
  width:100%;
}
`
const JobNotes = styled.h1`
  color: var(--color-main-highlight);
  margin:.5em 0;
`
const CellBtnContainer = styled.div`
  display:flex;
  justify-content: space-between;
`
const IconAndLabelContainer = styled.span`
  display:flex;
  position:relative;
`
const Separator = styled.section`
  margin:1em 0;
  padding:0 1.25em;
`
const UpdateButton = styled.button`
  width:fit-content;
  margin:.5em .75em;
`
const CancelButton = styled.button`
  width:fit-content;
  margin:.5em 0;
`
const ButtonContainer = styled.div`
  display:flex;
`
const TextAreaInput = styled.textarea`
  height:35vw;
`
const TextInput = styled.input`
  width: 50%;
`
function JobView({jobView, jobViewTL, handleJobView, handleStageSelect, refCheckbox, JobUpdateCall}) {
  const [state, dispatch] = useContext(DataContext)
  const [display, setDisplay] = useState(false)
  const [tha, setTha] = useState(false)
  const [faceToface, setFaceToFace] = useState(false)
  const [phoneScreen, setPhoneScreen] = useState(false)
  const [applied, setApplied] = useState(false)
  const [company, setCompany] = useState(false)
  const [role, setRole] = useState(false)
  const [contact, setContact] = useState(false)
  const [location, setLocation] = useState(false)
  const [source, setSource] = useState(false)
  const [link, setLink] = useState(false)
  const [notes, setNotes] = useState(false)
  const [error, setError] = useState(null)
  const updateRef = useRef('')
  const switchDisplayAndInput = (e) =>  {
    switch(e.target.id){
      case 'tha':
        if(!tha){
          return setTha(true)
        }else{
          if(!updateRef.current.value){
            return setError('Applied date has an error')
          }
          handleStageSelect(e.target.id, updateRef.current.value, true)
          return setTha(false)
        }
      case 'faceToface':
        if(!faceToface){
          return setFaceToFace(true)
        }else{
          if(!updateRef.current.value){
            return setError('Applied date has an error')
          }
          handleStageSelect(e.target.id, updateRef.current.value)
          return setFaceToFace(false)
        }
      case 'phoneScreen':
        if(!phoneScreen){
          return setPhoneScreen(true)
        }else{
          if(!updateRef.current.value){
            return setError('Applied date has an error')
          }
          handleStageSelect(e.target.id, updateRef.current.value)
          return setPhoneScreen(false)
        }
      case 'applied':
        if(!applied){
          return setApplied(true)
        }else{
          if(!updateRef.current.value){
            return setError('Applied date has an error')
          }
          handleStageSelect(e.target.id, updateRef.current.value)
          return setApplied(false)
        }
        // END STAGES UPDATE
      case 'company':
        if(!company){
          return setCompany(true)
        }else{
          if(!updateRef.current.value){
            return setError('Enter a company name')
          }
          JobUpdateCall([e.target.id, jobView[0]._id, updateRef.current.value])
          return setCompany(false)
        }
      case 'role':
        if(!role){
          return setRole(true)
        }else{
          if(!updateRef.current.value){
            return setError('Enter the role/position')
          }
          JobUpdateCall([e.target.id, jobView[0]._id, updateRef.current.value])
          return setRole(false)
        }
      case 'contact':
        if(!contact){
          return setContact(true)
        }else{
          if(!updateRef.current.value){
            return setError('Enter the contact information')
          }
          JobUpdateCall([e.target.id, jobView[0]._id, updateRef.current.value])
          return setContact(false)
        }
      case 'location':
        if(!location){
          return setLocation(true)
        }else{
          if(!updateRef.current.value){
            return setError('Enter the location of this job')
          }
          JobUpdateCall([e.target.id, jobView[0]._id, updateRef.current.value])
          return setLocation(false)
        }
      case 'source':
        if(!source){
          return setSource(true)
        }else{
          if(!updateRef.current.value){
            return setError('Enter the source of this job')
          }
          JobUpdateCall([e.target.id, jobView[0]._id, updateRef.current.value])
          return setSource(false)
        }
      case 'link':
        if(!link){
          return setLink(true)
        }else{
          if(!updateRef.current.value){
            return setError('Enter the link to this job')
          }
          JobUpdateCall([e.target.id, jobView[0]._id, updateRef.current.value])
          return setLink(false)
        }
      case 'notes':
        if(!notes){
          return setNotes(true)
        }else{
          JobUpdateCall([e.target.id, jobView[0]._id, updateRef.current.value])
          return setNotes(false)
        }

    }
  }
  useEffect(() =>{
    jobViewTL
      .to('body', { overflow:'hidden'}, '<')
      .from('.job-view--overlay', {opacity: 0, display:'none', autoAlpha: 0, xPercent: -100}, '<')
  }, [])
  let containerHeight = gsap.getProperty('main', 'height')
  return (
    <div className="job-view--overlay" css={css`
    position:absolute;
    background-color: var(--color-jobView-overlay);
    left:0;
    top:0;
    width:100%;
    min-height: 100vh;
    height:${containerHeight}px;
    z-index: 500;
    overflow-y: scroll;
    height:100vh;
    visibility:hidden;
    `}>
    <InnerContainer>
      {!error ? '' : <ErrorMessage>{error}</ErrorMessage>}
      <OverlayHeader>
        <CloseButton onClick={async (e) => {
          setDisplay(false)
          await handleJobView(e)
          }}>
          <p>Close</p>
        </CloseButton>
      </OverlayHeader>
      <OverlayBody>
      
      {
        !jobView ? 'no results' : (
          <OverlayMainContent key={jobView[0]._id}>
            <Container className="container">
            <Separator>
            <Cell>
              <IconAndLabelContainer>
              <IconBox id="applied">
                <FontAwesomeIcon  
                  icon={faBriefcase} 
                  color={`${jobView[0].stage.applied ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                />
              </IconBox>
                <CellLabelValue>
                <Label htmlFor="applied">Date Applied:</Label>
                { !applied ? <JobDetailHeadline className="input-value">{!jobView[0].stage.applied ? 'You have not applied' : <Moment format="D MMM YYYY" withTitle>{jobView[0].stage.applied}</Moment>}</JobDetailHeadline> : (<><input id="applied" ref={updateRef} type="date" className="input-box"/></>) }
                </CellLabelValue>
                </IconAndLabelContainer>
                <CellBtnContainer>
                  { !applied ? '' : <button onClick={() => {setError(''); setApplied(false)}}>Cancel</button>}
                  <button
                    id='applied'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!applied ? "Update" : "Confirm"}
                  </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
              <IconAndLabelContainer>
              <IconBox id="phoneScreen">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  color={`${jobView[0].stage.phoneScreen ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                />
              </IconBox>
                <CellLabelValue>
                <label htmlFor="phoneScreen">Phone Screen:</label>
                { !phoneScreen ? <JobDetailHeadline className="input-value">{!jobView[0].stage.phoneScreen ? 'No phone screen set' :  <Moment format="D MMM YYYY" withTitle>{jobView[0].stage.phoneScreen}</Moment>}</JobDetailHeadline> : (<><input id="phoneScreen" ref={updateRef} type="date" className="input-box"/></>) }
                </CellLabelValue>
                </IconAndLabelContainer>
                <CellBtnContainer>
                  { !phoneScreen ? '' : <button onClick={() => {setError(''); setPhoneScreen(false)}}>Cancel</button>}
                  <button
                    id='phoneScreen'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!phoneScreen ? "Update" : "Confirm"}
                  </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
              <IconAndLabelContainer>
              <IconBox id="interview">
                <FontAwesomeIcon 
                  icon={faPeopleArrows} 
                  color={`${jobView[0].stage.faceToface ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                />
              </IconBox>
                <CellLabelValue>
                <label htmlFor="faceToface">Interview:</label>
                { !faceToface ? <JobDetailHeadline className="input-value">{!jobView[0].stage.faceToface ? 'No interview set up' : <Moment format="D MMM YYYY" withTitle>{jobView[0].stage.faceToface}</Moment>}</JobDetailHeadline> : (<><input id="faceToface" ref={updateRef} type="date" className="input-box"/></>) }
                </CellLabelValue>
                </IconAndLabelContainer>
                <CellBtnContainer>
                  { !faceToface ? '' : <button onClick={() => {setError(''); setFaceToFace(false)}}>Cancel</button>}
                  <button
                    id='faceToface'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!faceToface ? "Update" : "Confirm"}
                  </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
              <IconAndLabelContainer>
              <IconBox id="tha">
                <FontAwesomeIcon 
                  icon={faHouseLaptop}
                  color={`${jobView[0].stage.takeHomeAssignment.dateReceived ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                />
              </IconBox>
                <CellLabelValue>
                <Label htmlFor="tha">Take Home Assignment:</Label>
                { !tha ? <JobDetailHeadline className="input-value">{!jobView[0].stage.takeHomeAssignment.dateReceived ? 'No take home assignments' : <Moment format="D MMM YYYY" withTitle>{jobView[0].stage.takeHomeAssignment.dateReceived}</Moment>}</JobDetailHeadline> : (<><input id="tha" ref={updateRef} type="date" className="input-box"/></>) }
                </CellLabelValue>
                </IconAndLabelContainer>
                <CellBtnContainer>
                  { !tha ? '' : <button onClick={() => {setError(''); setTha(false)}}>Cancel</button>}
                  <button
                    id='tha'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!tha ? "Update" : "Confirm"}
                  </button>
                </CellBtnContainer>
              </Cell>
              </Separator>
              <Separator>
              <Cell>
                <CellLabelValue>
                <Label htmlFor="company">Company:</Label>
                { !company ? <JobDetailHeadline className="input-value">{jobView[0].company}</JobDetailHeadline> : <TextInput defaultValue={jobView[0].company} id="company" ref={updateRef} type="text" className="input-box"/> }
                </CellLabelValue>
                <ButtonContainer>
                  { !company ? '' : <CancelButton onClick={() => {setError(''); setCompany(false)}}>Cancel</CancelButton>}
                  <UpdateButton
                    id='company'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!company ? "Update" : "Confirm"}
                  </UpdateButton>
                </ButtonContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <Label htmlFor="role">Role: </Label>
                  { !role ? <JobDetailHeadline className="input-value">{jobView[0].role}</JobDetailHeadline> : <TextInput defaultValue={jobView[0].role} id="role" ref={updateRef} type="text" className="input-box"/> }
                </CellLabelValue>
                <ButtonContainer>
                { !role ? '' : <CancelButton onClick={() => {setError(''); setRole(false)}}>Cancel</CancelButton>}
                <UpdateButton
                  id='role'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!role ? "Update" : "Confirm"}
                </UpdateButton>
                
                </ButtonContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <Label htmlFor="contact">Contact: </Label>
                  { !contact ? <JobDetailHeadline className="input-value">{jobView[0].contact}</JobDetailHeadline> : <TextInput defaultValue={jobView[0].contact} id="contact" ref={updateRef} type="text" className="input-box"/> }
                </CellLabelValue>
                <ButtonContainer>
                { !contact ? '' : <CancelButton onClick={() => {setError(''); setContact(false)}}>Cancel</CancelButton>}
                <UpdateButton
                  id='contact'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!contact ? "Update" : "Confirm"}
                </UpdateButton>
                
                </ButtonContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <Label htmlFor="location">Loaction:</Label>
                  { !location ? <JobDetailHeadline className="input-value">{jobView[0].location}</JobDetailHeadline> : <TextInput defaultValue={jobView[0].location} id="location" ref={updateRef} type="text" className="input-box"/> }
                </CellLabelValue>
                <ButtonContainer>
                { !location ? '' : <CancelButton onClick={() => {setError(''); setLocation(false)}}>Cancel</CancelButton>}
                <UpdateButton
                  id='location'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!location ? "Update" : "Confirm"}
                </UpdateButton>
                
                </ButtonContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <Label htmlFor="source">Source:</Label>
                  { !source ? <JobDetailHeadline className="input-value">{jobView[0].source}</JobDetailHeadline> : <TextInput defaultValue={jobView[0].source} id="source" ref={updateRef} type="text" className="input-box"/> }
                </CellLabelValue>
                <ButtonContainer>
                { !source ? '' : <CancelButton onClick={() => {setError(''); setSource(false)}}>Cancel</CancelButton>}
                <UpdateButton
                  id='source'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!source ? "Update" : "Confirm"}
                </UpdateButton>
                
                </ButtonContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <Label htmlFor="link">Link:</Label>
                  { !link ? <JobDetailHeadline className="input-value">{jobView[0].link}</JobDetailHeadline> : <TextInput defaultValue={jobView[0].link} id="link" ref={updateRef} type="text" className="input-box"/> }
                </CellLabelValue>
                <ButtonContainer>
                { !link ? '' : <CancelButton onClick={() => {setError(''); setLink(false)}}>Cancel</CancelButton>}
                <UpdateButton
                  id='link'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!link ? "Update" : "Confirm"}
                </UpdateButton>
                
                </ButtonContainer>
              </Cell>
              <Cell>
                <NotesCellLabelValue>
                  <Label htmlFor="notes">Notes:</Label>
                  { !notes ? <JobNotes className="input-value">{jobView[0].notes}</JobNotes> : (<TextAreaInput defaultValue={jobView[0].notes} id="notes" ref={updateRef} type="text" className="input-box"/>) }
                </NotesCellLabelValue>
                <ButtonContainer>
                { !notes ? '' : <CancelButton onClick={() => {setError('');setNotes(false)}}>Cancel</CancelButton>}
                  <UpdateButton
                    id='notes'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!notes ? "Update" : "Confirm"}
                  </UpdateButton>
                  
                </ButtonContainer>
              </Cell>
              </Separator>
            </Container>
        </OverlayMainContent>
        )
        
      }
      <OverlayFooter>

      </OverlayFooter>
      </OverlayBody>
    </InnerContainer>
    </div>
  )
}

export default JobView