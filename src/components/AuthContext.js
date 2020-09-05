import { createContext } from 'react'

function noop() {}

export const AuthContext = createContext({
    sessionID: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})