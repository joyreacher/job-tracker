import React, { useRef, useEffect, useContext, useState } from "react"
import styled from "@emotion/styled"
import {DataContext} from "../../context/DataContext";
import { jsx, css } from "@emotion/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faHouseLaptop, faPeopleArrows, faPhone } from '@fortawesome/free-solid-svg-icons'
import Moment from "react-moment";
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
  padding:0 2em;
`
const OverlayFooter = styled.div`
  font-size: clamp(1rem, 2.5vw, 2rem);
  max-width: 1020px;
  margin:2em auto 0 auto;
  display:flex;
`
const Container = styled.div`
  font-size: clamp(1rem, 2vw, 3rem);
  margin:0 auto;
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
  justify-content: space-around;
  margin:.9rem 0;
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
const IconBox = styled.span`
  top:0;
  left:-1.5em;
  width: 20px;
  height: 20px;
  background: var(--color-main-dark);
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
`
const CellLabelValue = styled.div`
  display:flex;
  justify-content:space-between;
  width:50%;
  ${mq[2]}{
    display:block;
  }
`
const CellBtnContainer = styled.div`
  display:flex;
  justify-content: space-between;
`
const IconAndLabelContainer = styled.div`
  display:flex;
  position:relative;
`
function JobView({jobView, jobViewTL, handleJobView, handleStageSelect, refCheckbox, JobUpdateCall}) {
  const [state, dispatch] = useContext(DataContext)
  const [display, setDisplay] = useState(false)
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
      .from('.job-view--overlay', {opacity: 0, display:'none', autoAlpha: 0, xPercent: -100})
  }, [])
  return (
    <span className="job-view--overlay" css={css`
    position:fixed;
    background-color: var(--color-jobView-overlay);
    left:0;
    top:0;
    width:100vw;
    min-height: 100vh;
    z-index: 500;
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
        !jobView ? '' : (<><IconInstructions>Click an icon to set the job stage</IconInstructions><FilterList>
          <ListItem>
              <Label className="form-check-label" htmlFor="applied" >
                <CheckBox
                  name="applied"
                  value="applied"
                  className="form-check-input"
                  type="checkbox"
                  onChange={async (e) => await handleStageSelect(e)} 
                  ref={refCheckbox} 
                  id='applied' 
                  controlled="true" 
                  checked={jobView[0].stage.applied ? true : ''} 
                />
                <IconBox id="applied">
                  <FontAwesomeIcon  
                    icon={faBriefcase} 
                    color={`${jobView[0].stage.applied ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                  />
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
                
                controlled="true" 
                checked={jobView[0].stage.phoneScreen ? true : ''} 
                id='phoneScreen' 
                ref={refCheckbox} 
                onChange={async (e) => await handleStageSelect(e)}
              />
              <IconBox id="phoneScreen">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  color={`${jobView[0].stage.phoneScreen ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                />
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
                
                
                controlled="true" 
                checked={jobView[0].stage.faceToface ? true : ''} 
                id='faceToface' 
                ref={refCheckbox} 
                onChange={async (e) => await handleStageSelect(e)} 
              />
              <IconBox id="interview">
                <FontAwesomeIcon 
                  icon={faPeopleArrows} 
                  color={`${jobView[0].stage.faceToface ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                />
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
                
                controlled="true" 
                checked={jobView[0].stage.takeHomeAssignment.dateReceived ? true : ''} 
                id='tha' 
                ref={refCheckbox} 
                onChange={async (e) => await handleStageSelect(e)} 
                
              />
              <IconBox id="tha">
                <FontAwesomeIcon 
                  icon={faHouseLaptop}
                  color={`${jobView[0].stage.takeHomeAssignment.dateReceived ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                />
              </IconBox>
            </Label>
          </ListItem>
  </FilterList> </>)
      }
      
      {
        !jobView ? 'no results' : (
          <OverlayMainContent key={jobView[0]._id}>
            <Container >
            <Cell>
              <IconAndLabelContainer>
              <IconBox id="applied">
                <FontAwesomeIcon  
                  icon={faBriefcase} 
                  color={`${jobView[0].stage.applied ? 'var(--color-main-danger)' : 'var(--color-main-light)'} `}
                />
              </IconBox>
                <CellLabelValue>
                <label htmlFor="applied">Date Applied:</label>
                { !applied ? <JobDetailHeadline className="input-value">{!jobView[0].stage.applied ? 'You have not applied' : <Moment date={jobView[0].stage.applied}/>}</JobDetailHeadline> : (<><input id="applied" ref={updateRef} type="date" className="input-box"/></>) }
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
                { !phoneScreen ? <JobDetailHeadline className="input-value">{!jobView[0].stage.phoneScreen ? 'No phone screen set' : <Moment date={jobView[0].stage.phoneScreen}/>}</JobDetailHeadline> : (<><input id="phoneScreen" ref={updateRef} type="date" className="input-box"/></>) }
                </CellLabelValue>
                </IconAndLabelContainer>
                <CellBtnContainer>
                  { !phoneScreen ? '' : <button onClick={() => {setError(''); setApplied(false)}}>Cancel</button>}
                  <button
                    id='phoneScreen'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!applied ? "Update" : "Confirm"}
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
                { !faceToface ? <JobDetailHeadline className="input-value">{!jobView[0].stage.faceToface ? 'No interview set up' : <Moment date={jobView[0].stage.faceToface}/>}</JobDetailHeadline> : (<><input id="faceToface" ref={updateRef} type="date" className="input-box"/></>) }
                </CellLabelValue>
                </IconAndLabelContainer>
                <CellBtnContainer>
                  { !faceToface ? '' : <button onClick={() => {setError(''); setApplied(false)}}>Cancel</button>}
                  <button
                    id='faceToface'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!applied ? "Update" : "Confirm"}
                  </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                <label htmlFor="company">Company:</label>
                { !company ? <JobDetailHeadline className="input-value">{jobView[0].company}</JobDetailHeadline> : (<><input defaultValue={jobView[0].company} id="company" ref={updateRef} type="text" className="input-box"/></>) }
                </CellLabelValue>
                <CellBtnContainer>
                  { !company ? '' : <button onClick={() => {setError(''); setCompany(false)}}>Cancel</button>}
                  <button
                    id='company'
                    onClick={(e) => switchDisplayAndInput(e)}
                  >
                    {!company ? "Update" : "Confirm"}
                  </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <label htmlFor="role">Role: </label>
                  { !role ? <h1 className="input-value">{jobView[0].role}</h1> : (<><input defaultValue={jobView[0].role} id="role" ref={updateRef} type="text" className="input-box"/><button onClick={() => {setError('');setRole(false)}}>Cancel</button></>) }
                </CellLabelValue>
                <CellBtnContainer>
                { !role ? '' : <button onClick={() => {setError(''); setRole(false)}}>Cancel</button>}
                <button
                  id='role'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!role ? "Update" : "Confirm"}
                </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <label htmlFor="contact">Contact: </label>
                  { !contact ? <h1 className="input-value">{jobView[0].contact}</h1> : (<><input defaultValue={jobView[0].contact} id="contact" ref={updateRef} type="text" className="input-box"/><button onClick={() => {setError('');setContact(false)}}>Cancel</button></>) }
                </CellLabelValue>
                <CellBtnContainer>
                { !contact ? '' : <button onClick={() => {setError(''); setContact(false)}}>Cancel</button>}
                <button
                  id='contact'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!contact ? "Update" : "Confirm"}
                </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <label htmlFor="location">Loaction:</label>
                  { !location ? <h1 className="input-value">{jobView[0].location}</h1> : (<><input defaultValue={jobView[0].location} id="location" ref={updateRef} type="text" className="input-box"/><button onClick={() => {setError('');setLocation(false)}}>Cancel</button></>) }
                </CellLabelValue>
                <CellBtnContainer>
                { !location ? '' : <button onClick={() => {setError(''); setLocation(false)}}>Cancel</button>}
                <button
                  id='location'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!location ? "Update" : "Confirm"}
                </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <label htmlFor="source">Source:</label>
                  { !source ? <h1 className="input-value">{jobView[0].source}</h1> : (<><input defaultValue={jobView[0].source} id="source" ref={updateRef} type="text" className="input-box"/><button onClick={() => {setError('');setSource(false)}}>Cancel</button></>) }
                </CellLabelValue>
                <CellBtnContainer>
                { !source ? '' : <button onClick={() => {setError(''); setSource(false)}}>Cancel</button>}
                <button
                  id='source'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!source ? "Update" : "Confirm"}
                </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <label htmlFor="link">Link:</label>
                  { !link ? <h1 className="input-value">{jobView[0].link}</h1> : (<><input defaultValue={jobView[0].link} id="link" ref={updateRef} type="text" className="input-box"/><button onClick={() => {setError('');setLink(false)}}>Cancel</button></>) }
                </CellLabelValue>
                <CellBtnContainer>
                { !link ? '' : <button onClick={() => {setError(''); setLink(false)}}>Cancel</button>}
                <button
                  id='link'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!link ? "Update" : "Confirm"}
                </button>
                </CellBtnContainer>
              </Cell>
              <Cell>
                <CellLabelValue>
                  <label htmlFor="notes">Notes:</label>
                  { !notes ? <h1 className="input-value">{jobView[0].notes}</h1> : (<><textarea defaultValue={jobView[0].notes} id="notes" ref={updateRef} type="text" className="input-box"/><button onClick={() => {setError('');setNotes(false)}}>Cancel</button></>) }
                </CellLabelValue>
                <button
                  id='notes'
                  onClick={(e) => switchDisplayAndInput(e)}
                >
                  {!notes ? "Update" : "Confirm"}
                </button>
              </Cell>
            </Container>
        </OverlayMainContent>
        )
        
      }
      <OverlayFooter>

      </OverlayFooter>
      </OverlayBody>
    </InnerContainer>
    </span>
  )
}

export default JobView