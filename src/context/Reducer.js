
export const reducer = (state, action) => {
  switch (action.type) {
    case 'checkbox':
      return{
        ...state,
        applied: action.applied,
        phoneScreen: action.phoneScreen,
        faceToface: action.faceToface,
        tha: action.tha
      }
    case 'applied':
      return{
        ...state,
        applied: action.applied
      }
    case 'phoneScreen':
      return{
        ...state,
        phoneScreen: action.phoneScreen
      }
    case 'faceToface':
      return{
        ...state,
        faceToface: action.faceToface
      }
    case 'tha':
        return{
          ...state,
          tha: action.tha
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
  phoneScreen:false,
  faceToface: false,
  tha: false,
  refresh: false,
  jobs:[],
  user: localStorage.getItem('username'),
  jobId: '',
  token: ''
}