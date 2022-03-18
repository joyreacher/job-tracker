
export const reducer = (state, action) => {
  switch (action.type) {
    case 'applied':
      return{
        ...state,
        applied: action.applied
      }
    case 'login':
      return{
        ...state,
        token: action.token
      }
    case "set job id":
      return {
        ...state,
        jobId: action.jobId,
        token: action.token
      }
    case "update":
      console.log("update")
      return {
        ...state,
        refresh: action.payload.refresh,
        jobs: action.payload.jobs
      }
    case 'clear':
      return{
        jobs: []
      }
    case 'add':
      return{
        ...state,
        jobs: [action.payload.jobs]
      }
    case 'add_jobs':
      return action
    default:
      return state
  }
}

export const initialState = {
  applied: false,
  refresh: false,
  jobs:[],
  user: localStorage.getItem('username'),
  jobId: '',
  token: ''
}