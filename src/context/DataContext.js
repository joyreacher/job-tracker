import React, { Children, useState } from 'react';
export const DataContext = React.createContext({
  jobs: () => { console.log('this would set the language')},
  addJobs: (application) => {
    console.log(application)
  }
  
});

class DataProvider extends React.Component {
  render() {
    return (
      <DataContext.Provider>
        {Children}
      </DataContext.Provider>
    )
  }
}

export default DataContext
export { DataProvider }