
export const reducer = (state, action) => {
  switch (action.type) {
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
  refresh: false,
  jobs:[],
  user: localStorage.getItem('username')
}