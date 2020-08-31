import React, { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from './AuthContext'
import Input from './ui/Input'
import Button from './ui/Button'
import Divider from './ui/Divider'
import Alert from './ui/Alert'
import ImageLogo from '../assets/images/logo.js'
import { LOGIN, REGISTER } from '../utils/queries'
import { setUser } from '../utils/actions'

const Login = ({ setLoading, setError }) => {
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()

    const [ onLogin, { loading } ] = useMutation(LOGIN)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

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
                placeholder: 'Enter Password',
                onChange: (e) => {
                    setPassword(e.target.value)
                }
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
                        auth.login(user.token, user.id)
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
                <p>Sign In</p>
            </Button>
        </React.Fragment>
    )
}

const Register = ({ setLoading, setError }) => {
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()

    const [ onRegister, { loading } ] = useMutation(REGISTER)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                type: 'email',
                value: email,
                placeholder: 'Enter email',
                onChange: (e) => {
                    setEmail(e.target.value)
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
            <Input options={{
                type: 'password',
                value: confirmPassword,
                placeholder: 'Enter confirm password',
                onChange: (e) => {
                    setConfirmPassword(e.target.value)
                }
            }} />
            <Button options={{
                type: 'inactive',
                handler: () => {
                    if (!name && !email && !password && !confirmPassword)
                        return null

                    onRegister({
                        variables: {
                            name, email,
                            password, confirmPassword
                        }
                    })
                    .then(data => {
                        const user = data.data.register
                        auth.login(user.token, user.id)
                        dispatch(setUser(user))
                    })
                    .catch(err => {
                        const msg = err.message.split(': ')[1]
                        setError(msg)
                    })

                    setName('')
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                }
            }}>
                <p>Sign Up</p>
            </Button>
        </React.Fragment>
    )
}

export default () => {
    const [authMethod, setAuthMethod] = useState('login')

    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')

    return (
        <main className="auth">
            {(error) && <Alert type="error" message={error} />}
            <form className={`${(loading) ? 'loading' : 'form'}`}>
                <div className="logo">
                    {ImageLogo}
                </div>

                {(authMethod === 'login')
                    ? <Login setLoading={setLoading} setError={setError} />
                    : <Register setLoading={setLoading} setError={setError} />
                }

                <Divider distance={15} horizontal />

                <Button options={{
                    type: 'inactive clear',
                    handler: () => {
                        if (authMethod === 'login')
                            setAuthMethod('register')
                        else
                            setAuthMethod('login')
                    }
                }}>
                    {(authMethod === 'login')
                        ? <p>New to AidReamer? Sign up now</p>
                        : <p>Already have an account?</p>
                    }
                </Button>
            </form>
        </main>
    )
}