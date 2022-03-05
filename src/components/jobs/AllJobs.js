import React, { useEffect } from "react"
import Moment from 'react-moment';
//components
import JobCard from "./JobCard"
// styles
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/react"
const breakpoints = [376, 411, 576, 768, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

const Table = styled.table`
  width:100%;
`
const TableBody = styled.tbody`
  max-width:100%;
`
const Head = styled.thead`
`
const TableHead = styled.th`
  background-color: var(--color-table-accent);
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
  const compareArrays = () =>{
    const result = JSON.parse(localStorage.getItem('jobs'))
    console.log(result)
    if(!result || typeof(result) !== 'object'){
      return false
    }
    if(result.length !== jobs.length){
      return false
    }
    return true
  }
  useEffect(() =>{
    storeJobs(jobs)
  })
  /** This will run when localstorage is defined */
  if(compareArrays()){
    /**
     * @var result
     * @description Retrieve and parse the stringified jobs array
     */
    const result = JSON.parse(localStorage.getItem('jobs'))
    return(
      <Table>
        <Head>
          <tr>
            <TableHead>Local</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Date applied</TableHead>
            <TableHead></TableHead>
          </tr>
        </Head>
        
        <TableBody>
        {
          result.map((element, i) => {
            // get current date
            const currentDate = new Date()
            // count 5 days back
            const date = new Date(element.dateAdded)
            const dateToUse = date.toLocaleDateString('en-US')
            if(i < 6){
              return(
  
                
                <tr key={element._id}>
                <TableHead>
                  <Moment subtract={{ days: 5 }} format="MMM DD">{currentDate}</Moment>
                </TableHead>
                
                  <JobCard key={element._id} application={element} />
                </tr>
              
              )
            }
            
          })
        }
        </TableBody>
      </Table>
    )
  }else{
    /** This will run when localstorage jobs value is not defined */
    return (
      <Table>
        <Head>
          <tr>
            <TableHead>API</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Date applied</TableHead>
            <TableHead></TableHead>
          </tr>
        </Head>
        
        <TableBody>
        {
          jobs.map((element, i) => {
            // get current date
            const currentDate = new Date()
            // count 5 days back
            const date = new Date(element.dateAdded)
            const dateToUse = date.toLocaleDateString('en-US')
            if(i < 6){
              return(

                
                <tr key={element._id}>
                <TableHead>
                  <Moment subtract={{ days: 5 }} format="MMM DD">{currentDate}</Moment>
                </TableHead>
                
                  <JobCard key={element._id} application={element} />
                </tr>
              
              )
            }
            
          })
        }
        </TableBody>
      </Table>
    )
  }
  
}

export default AllJobs