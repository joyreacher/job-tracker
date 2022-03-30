import React, { useEffect, useContext } from "react"
import styled from "@emotion/styled"
import {DataContext} from "../../context/DataContext";
import { jsx, css } from "@emotion/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faHouseLaptop, faPeopleArrows, faPhone } from '@fortawesome/free-solid-svg-icons'
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
  height:25vh;
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
const IconBox = styled.div`
  width: 20px;
  height: 20px;
  background: var(--color-main-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  
`
function JobView({jobView, jobViewTL, handleJobView, handleStageSelect, refCheckbox}) {
  const [state, dispatch] = useContext(DataContext)
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
      <OverlayHeader>
        <CloseButton onClick={async (e) => {
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
            </FilterList>
          </CheckBoxContainer>
          
        </OverlayFooter>
        </div>
        )
      }
      </OverlayBody>
    </InnerContainer>
    </span>
  )
}

export default JobView