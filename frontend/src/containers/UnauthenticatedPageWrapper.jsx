import React from 'react'
import Navbar from '../components/Navbar'

function UnauthenticatedPageWrapper({children}) {
  return (
    <>
        <Navbar />
        <main className="flex-grow">
            {children}
        </main>
    </>
  )
}

export default UnauthenticatedPageWrapper