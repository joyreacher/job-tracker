import React, { lazy, useEffect, useState, useContext, Suspense } from "react"
import Moment from 'react-moment';
//components
import JobCard from "./JobCard"
// styles
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/react"
import {DataContext} from "../../context/DataContext";
import { gsap } from "gsap/dist/gsap";
import { Flip } from "gsap/dist/Flip";
gsap.registerPlugin(Flip);
const JobView = lazy(() => import('./JobView'))
const breakpoints = [376, 411, 576, 768, 1020, 1200]
const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

const Table = styled.div`
  width:100%;
`
const TableBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width:100%;
`
const Head = styled.div`
`
const TableHead = styled.div`
  background-color: var(--color-table-accent);
`
const TableRow = styled.div`
  cursor: pointer;
  &:hover{
    background-color: red;
  }
`
// const jobViewTL = gsap.timeline({reversed: true, paused: true})
function AllJobs({jobs, jobViewTL, handleJobView, handleClick}) {
  const [state, dispatch] = useContext(DataContext)
  const [jobId, setJobId] = useState('')
  // const { jobs } = useContext(DataContext)
  /**
   * @function storeJobs
   * @param {Array} jobs 
   * @returns Stringified array of jobs
   */
  const storeJobs = async (jobs) =>{
    const result = JSON.stringify(jobs)
    localStorage.setItem('jobs', result)
    return result
  }
  const compareArrays = () =>{
    const result = JSON.parse(localStorage.getItem('jobs'))
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
  /* This will run when localstorage is defined */
  if(compareArrays()){
    /** 
     * !@var result
     * !@description Retrieve and parse the stringified jobs array
     */
    const result = JSON.parse(localStorage.getItem('jobs'))
    return(
      <>
      <Suspense fallback={'loading'}>
        <JobView handleJobView={handleJobView}  jobViewTL={jobViewTL} jobs={result} />
      </Suspense>
      
      <Table>
        
        <TableBody className="group">
        {
          result.map((element, i) => {
            // get current date
            const currentDate = new Date()
            // count 5 days back
            const date = new Date(element.dateAdded)
            const dateToUse = date.toLocaleDateString('en-US')
            if(i < 20){
              return(
                <TableRow 
                  className={`job-row ${!element.stage.applied ? '' : 'applied'}`}  
                  key={element._id} 
                  id={element._id} 
                  data-tha={!element.stage.takeHomeAssignment.received ? '' : 'true'}
                  data-applied={!element.stage.applied ? '' : 'true'}
                  data-phonescreen={!element.stage.phoneScreen ? '' : 'true'}
                  data-facetoface={!element.stage.faceToface ? '' : 'true'}
                  onClick={async (e) => {
                    await dispatch({type: 'set job id',token:'', jobId: e.target.parentElement.id})
                    handleJobView(e)
                    }}>
                <TableHead>
                  <Moment subtract={{ days: 5 }} format="MMM DD">{currentDate}</Moment>
                </TableHead>
                
                  <JobCard className="job" key={element._id} application={element}/>
                </TableRow>
              
              )
            }
            
          })
        }
        </TableBody>
      </Table>
      </>
    )
  }else{
    /** This will run when localstorage jobs value is not defined */
    return (
      <>
      <Suspense fallback={'loading'}>
        <JobView handleJobView={handleJobView}  jobViewTL={jobViewTL} jobs={jobs} />
      </Suspense>
      
      <Table>
      
        <Head>
          <div>
            <TableHead>Local</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date Added</TableHead>
            {/* <TableHead>Location</TableHead> */}
            {/* <TableHead>Source</TableHead> */}
            <TableHead>Link</TableHead>
            {/* <TableHead>Notes</TableHead> */}
            {/* <TableHead>Date applied</TableHead> */}
            {/* <TableHead>Delete/View</TableHead> */}
            <TableHead></TableHead>
          </div>
        </Head>
        
        <TableBody>
        {
          jobs.map((element, i) => {
            // get current date
            const currentDate = new Date()
            // count 5 days back
            const date = new Date(element.dateAdded)
            const dateToUse = date.toLocaleDateString('en-US')
            if(i < 20){
              return(
  
                
                <TableRow key={element._id} id={element._id} onClick={async (e) => {
                  await dispatch({type: 'set job id',token:'', jobId: e.target.parentElement.id})
                  handleJobView(e)
                  
                  }}>
                <TableHead>
                  <Moment subtract={{ days: 5 }} format="MMM DD">{currentDate}</Moment>
                </TableHead>
                
                  <JobCard  key={element._id} application={element}/>
                </TableRow>
              
              )
            }
            
          })
        }
        </TableBody>
      </Table>
      </>
    )
  }
  
}

export default AllJobs