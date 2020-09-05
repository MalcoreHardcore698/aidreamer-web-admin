import { useState, useCallback, useEffect } from 'react'
import { setCookie, getCookie, clearCookie } from '../utils/functions'
// import { v4 } from 'uuid'

const cookie = 'secret'

export const useAuth = () => {
  const [sessionID, setSessionID] = useState('')
  const [ready, setReady] = useState(false)

  const login = useCallback((value) => {
    console.log(value)
    if (value) {
      setSessionID(value)
      setCookie(cookie, value)
    }
  }, [])

  const logout = useCallback(() => {
    setSessionID('')
    clearCookie(cookie)
  }, [])

  useEffect(() => {
    const session = getCookie(cookie)

    if (session) setSessionID(session)
    else login(session)

    setReady(true)
  }, [login])

  return { login, logout, sessionID, ready }
}