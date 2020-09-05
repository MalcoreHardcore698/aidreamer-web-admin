import React, { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from './AuthContext'
import Input from './ui/Input'
import Button from './ui/Button'
import Checkbox from './ui/Checkbox'
import Alert from './ui/Alert'
import ImageLogo from '../assets/images/logo.js'
import { LOGIN } from '../utils/queries'
import { setUser } from '../utils/actions'

const Login = ({ setLoading, setError }) => {
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()

    const [ onLogin, { loading } ] = useMutation(LOGIN)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [settings, setSettings] = useState([
        { id: 0, value: 'Remember Me', checked: false }
    ])

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

    return (
        <React.Fragment>
            <Input options={{
                type: 'text',
                value: name,
                placeholder: 'Enter name',
                onChange: (e) => {
                    setName(e.target.value)
                }
            }} />

            <Input options={{
                type: 'password',
                value: password,
                placeholder: 'Enter password',
                onChange: (e) => {
                    setPassword(e.target.value)
                }
            }} />

            <Checkbox options={{
                list: settings,
                handler: setSettings
            }} />
            
            <Button options={{
                type: 'inactive',
                handler: () => {
                    onLogin({
                        variables: {
                            name, password
                        }
                    })
                    .then(data => {
                        const user = data.data.login
                        auth.login(user.sessionID)
                        dispatch(setUser(user))
                    })
                    .catch(err => {
                        const msg = err.message.split(': ')[1]
                        setError(msg)
                    })

                    setName('')
                    setPassword('')
                }
            }}>
                <p>Log In</p>
            </Button>
        </React.Fragment>
    )
}

export default () => {
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')

    const classes = [
        (loading) ? 'loading' : 'form'
    ]

    return (
        <main className="auth">
            {(error) && <Alert type="error" message={error} />}
            <form className={classes.join(' ')}>
                <div className="logo">
                    {ImageLogo}
                </div>

                <Login setLoading={setLoading} setError={setError} />
            </form>
        </main>
    )
}