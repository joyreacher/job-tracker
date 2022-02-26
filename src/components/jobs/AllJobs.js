import React, { useEffect } from "react"
// styles
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/react"
const breakpoints = [376, 411, 576, 768, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

const Container = styled.section`
  position:relative;
`
function AllJobs({jobs}) {
  /**
   * @function storeJobs
   * @param {Array} jobs 
   * @returns Stringified array of jobs
   */
  const storeJobs = (jobs) =>{
    const result = JSON.stringify(jobs)
    localStorage.setItem('jobs', result)
    return result
  }
  useEffect(() =>{
    storeJobs(jobs)
  })
  /** This will run when localstorage is defined */
  if(localStorage.getItem('jobs')){
    /**
     * @var result
     * @description Retrieve and parse the stringified jobs array
     */
    const result = JSON.parse(localStorage.getItem('jobs'))
    return(
      <Container>
      <h1>this is the alll jobs ccomponent</h1>
      <h2>This is from localStorage</h2>
      {
        result.map(element => {
          return(
            <div key={element._id}>
              <h3>{element.company}</h3>
              <p>{element.role}</p>
              <p>{element.contact}</p>
              <p>{element.location}</p>
              <p>{element.source}</p>
              <p>{element.link}</p>
              <p>{element.notes}</p>
          </div>
            )
        })
      }
    </Container>
    )
  }
  /** This will run when localstorage jobs value is not defined */
  return (
    <div>
      <p>this is the alll jobs ccomponent</p>
      <p>This is from props</p>
      {
        jobs.map(element => {
          return(
            <div key={element._id}>
              <h3>{element.company}</h3>
              <p>{element.role}</p>
              <p>{element.contact}</p>
              <p>{element.location}</p>
              <p>{element.source}</p>
              <p>{element.link}</p>
              <p>{element.notes}</p>
          </div>
            )
        })
      }
    </div>
  )
}

export default AllJobs