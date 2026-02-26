import React from 'react'
import BottomNav from './BottomNav'

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <main>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout