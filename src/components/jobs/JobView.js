import React, { useEffect, useContext } from "react"
import styled from "@emotion/styled"
import {DataContext} from "../../context/DataContext";
import { jsx, css } from "@emotion/react"
const InnerContainer = styled.section`
  height:100%;
  width:100%;
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
  margin:4em auto 0 auto;
  display:flex;
`
const Container = styled.div`
  font-size: clamp(1.3rem, 3vw, 13rem);
`
const InputCell = styled.div`
  display:flex;
  align-items: center;
  // margin: 0 1em;
`
const InputLabel = styled.label`
  margin:0 1em;
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
function JobView({handleAnimation, jobViewTL, jobs, jobId, handleJobView}) {
  const [state, dispatch] = useContext(DataContext)
  useEffect(() =>{
    jobViewTL
      .from('.job-view--overlay', {opacity: 0, display:'none', autoAlpha: 0, xPercent: -100})
  },[])
  return (
    <span className="job-view--overlay" css={css`
    position:fixed;
    background-color: var(--color-jobView-overlay);
    left:0;
    top:0;
    width:100vw;
    min-height: 100vh;
    z-index: 500;
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
          jobs.map((item) => {
            // console.log(state)
            // console.log(item._id)
            if(item._id === state.jobId){
              return(
                <Container key={item._id}>
                  <Cell>
                    <p>Company:</p>
                    <h1>{item.company}</h1>
                  </Cell>
                  <Cell>
                    <p>Role: </p>
                    <h1>{item.role}</h1>
                  </Cell>
                  <Cell>
                    <p>Contact: </p>
                    <h1>{item.contact}</h1>
                  </Cell>
                  <Cell>
                    <p>Loaction:</p>
                    <h1>{item.location}</h1>
                  </Cell>
                  <Cell>
                    <p>Source:</p>
                    <h1>{item.source}</h1>
                  </Cell>
                  <Cell>
                    <p>Link:</p>
                    <h1>{item.link}</h1>
                  </Cell>
                  <Cell>
                    <p>Notes:</p>
                    <h1>{item.notes}</h1>
                  </Cell>
                </Container>
              )
            }
          })
        }
      </OverlayBody>
      <OverlayFooter>
        <InputCell>
          <InputLabel htmlFor="applied">Applied</InputLabel>
          <Checkbox name="applied" type="checkbox"/>
        </InputCell>
        <InputCell>
          <InputLabel htmlFor="take_home">Phone Screen</InputLabel>
          <Checkbox name="take_home" type="checkbox"/>
        </InputCell>
        <InputCell>
          <InputLabel htmlFor="interview">Interview</InputLabel>
          <Checkbox name="interview" type="checkbox"/>
        </InputCell>
        <InputCell>
          <InputLabel htmlFor="take_home">Take Home Assignment</InputLabel>
          <Checkbox name="take_home" type="checkbox"/>
        </InputCell>
        
      </OverlayFooter>
    </InnerContainer>
    </span>
  )
}

export default JobView