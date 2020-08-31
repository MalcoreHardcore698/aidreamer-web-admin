import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { useAuth } from '../hooks/auth.hook'
import Main from './Main'
import '../assets/styles/App.css'

export default () => {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token

  if (!ready && !userId) {
    return <p>Loading</p>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div className="app">
        <Router>
          <Main />
        </Router>
      </div>
    </AuthContext.Provider>
  )
}
