"use client"
import React, { createContext } from 'react'
export const OwnerContext =createContext()
const OwnerProvider = ({children}) => {
  const c = 3
  return <OwnerContext.Provider value={{c}}>
  {children}
  </OwnerContext.Provider>
}

export default OwnerProvider
