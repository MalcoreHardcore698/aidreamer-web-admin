import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { useAuth } from '../hooks/auth.hook'
import Main from './Main'
import '../assets/styles/App.css'

export default () => {
  const { sessionID, login, logout } = useAuth()
  const isAuthenticated = !!sessionID

  return (
    <AuthContext.Provider value={{
      sessionID, login, logout, isAuthenticated
    }}>
      <div className="app">
        <Router>
          <Main />
        </Router>
      </div>
    </AuthContext.Provider>
  )
}
