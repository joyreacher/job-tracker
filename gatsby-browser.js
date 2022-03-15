import React from 'react'
import { DataProvider } from './src/context/DataContext'


import './src/styles/global.css'
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}
export const wrapRootElement = ({ element }) => {
  <DataProvider>
    {element}
  </DataProvider>
}