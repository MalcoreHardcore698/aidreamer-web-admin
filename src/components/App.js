import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { useAuth } from '../hooks/auth.hook'
import { useQuery } from '@apollo/react-hooks'

import Row from './ui/Row'
import Container from './ui/Container'
import Alert from './ui/Alert'
import Skeleton from './ui/Skeleton'

import Main from './Main'

import { setUser } from '../utils/actions'
import { GET_USER } from '../utils/queries'

import '../assets/styles/App.css'

const SkeletonContent = () => (
  <main className="skeleton">
      <aside>
          <Container>
              <Skeleton options={{ height: '85px' }} />
              <Skeleton options={{ height: '45px' }} />
          </Container>
          <Container>
              <Skeleton />
              <Skeleton />
              <Skeleton />
          </Container>
      </aside>
      
      <aside>
          <Row type="flex">
              <Skeleton options={{ height: '45px' }} />
              <Skeleton options={{ height: '45px' }} />
              <Skeleton options={{ height: '45px' }} />
              <Skeleton options={{ height: '45px' }} />
              <Skeleton options={{ height: '45px' }} />
          </Row>
          <Row type="flex">
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
          </Row>
      </aside>
      
      <aside>
          <Container>
              <Skeleton options={{ height: '85px' }} />
              <Skeleton options={{ height: '45px' }} />
          </Container>
          <Container>
              <Skeleton />
              <Skeleton />
              <Skeleton />
          </Container>
      </aside>
  </main>
)

export default () => {
  const { sessionID, login, logout } = useAuth()
  const isAuthenticated = !!sessionID

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const { data, loading, error } = useQuery(GET_USER)

  useEffect(() => {
    if (data) {
      if (data.getUser) dispatch(setUser(data.getUser))
      else logout()
    }
  }, [data, logout, dispatch])

  if (loading && !state.user) {
    return <SkeletonContent />
  }

  if (error) {
    return (
      <main className="alert">
        <Alert type="error" message="Sorry, site is temporarily unavailable" />
      </main>
    )
  }

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