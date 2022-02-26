import React, { useEffect } from "react"

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
      <>
      <p>this is the alll jobs ccomponent</p>
      <p>This is from localStorage</p>
      {
        result.map(element => {
          return(
              <p key={element._id}>{element.role}</p>
            )
        })
      }
    </>
    )
  }
  /** This will run when localstorage jobs value is not defined */
  return (
    <div>
      <p>this is the alll jobs ccomponent</p>
      <p>This is from props</p>
      {
        jobs.map(element => {
          console.log(element.role)
          return(
              <p key={element._id}>{element.role}</p>
            )
        })
      }
    </div>
  )
}

export default AllJobs