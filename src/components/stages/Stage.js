import React, { useEffect } from "react"
// styles
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/react"

const Container = styled.section`
  height: 30vh;
  margin:1em 0;
`
const InnerContainer = styled.div`
  display:flex;
  justify-content: space-around;
  margin:0 auto;
  background-color:green;
  padding:1rem;
  height:100%;
`

const Applied = styled.section`
  background-color:skyblue;
  width:80%;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:1.2rem;
`
const PhoneScreen = styled.section`
  background-color:orangered;
  width:80%;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:1.2rem;
`
const FaceToFace = styled.section`
  background-color:green;
  width:80%;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:1.2rem;
`
const TakeHomeAssignment = styled.section`
  background-color:purple;
  width:80%;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:1.2rem;
`
const Result = styled.section`
  background-color:black;
  width:80%;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:1.2rem;
`

const ClearFilters = styled.section`
  cursor: pointer;
  background-color:lime;
  width:80%;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:1.2rem;
`

function Stage({ filterJobs, clearFilters }) {
  return (
    <Container>
      <InnerContainer>
        <Applied 
          data-filter="applied"
          className="option" 
          onClick={() => filterJobs("applied")}>
          Applied
        </Applied>
        <PhoneScreen className="option" onClick={() => filterJobs("phonescreen")}>
          PhoneScreen
        </PhoneScreen>
        <FaceToFace className="option" onClick={() => filterJobs("facetoface")}>
          Face To Face
        </FaceToFace>
        <TakeHomeAssignment className="option" onClick={() => filterJobs("tha")}>
          Take Home Assignment
        </TakeHomeAssignment>
        <Result>
          Result
        </Result>
        <ClearFilters 
          onClick={() => clearFilters()}>
          Clear filters
        </ClearFilters>
      </InnerContainer>
    </Container>
  )
}

export default Stage