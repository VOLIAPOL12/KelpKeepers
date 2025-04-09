import React from 'react'
import Navbar from '../components/Navbar'

function UnauthenticatedPageWrapper({children}) {
  return (
    <>
        <main className="flex-grow">
            {children}
        </main>
    </>
  )
}

export default UnauthenticatedPageWrapper