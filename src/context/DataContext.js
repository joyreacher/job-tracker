import React, { useReducer, useState } from 'react';
import { reducer, initialState} from './Reducer'

export const DataContext = React.createContext({
  state:initialState,
  dispatch: () =>reducer
});

export const DataProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  )
}
