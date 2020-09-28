import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUsers,
    faNewspaper,
    faGamepad,
    faPaw,
    faEye,
    faImage,
    faGlobeAsia,
    faPaperPlane,
    faTrophy,
    faBell,
    faRocket,
    faTheaterMasks,
    faIcons,
    faCog,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from './context/Auth'
import Row from './ui/Row'
import Button from './ui/Button'
import Navigation from './ui/Navigation'
import Modal from './ui/Modal'
import ViewEmpty from './views/Empty'
import ViewNotifications from './views/Notifications'
import ViewMenu from './views/Menu'
import {
    SettingsEditProfileContent,
    SettingsHomeContent,
    SettingsQuestionContent,
    SettingsLanguageContent
} from './views/Settings'
import Auth from './Auth'
import SVGLogo from '../assets/images/logo'
import routes from '../routes'
import '../assets/styles/App.css'

const Content = () => {
    const state = useSelector(state => state)

    const { logout } = useContext(AuthContext)

    const [closeByBackground, setClosedByBackground] = useState(true)
    const [content, setModal] = useState()
    const [center, setCenterModal] = useState(false)
  
    const showModal = (content, center=false) => {
        setModal(content)
        setCenterModal(center)
        document.body.style.overflow = 'hidden'
    }
    const hideModal = () => {
        setModal(null)
        setCenterModal(false)
        document.body.style.overflow = 'initial'
    }
    
    const getOptions = (routes, isCenter=true) => ({
        type: 'large-round',
        handler: () => showModal(routes, isCenter)
    })

    useEffect(() => {
        if ((state.user) && !state.user.avatar) {
            setClosedByBackground(false)
            showModal([
                {
                    path: '/',
                    title: 'Choose your Avatar',
                    component: () => <ViewEmpty />
                }
            ], true)
        }
    }, [state.user, logout])

    return (
        <React.Fragment>
            <Navigation options={{
                dashboard: true,
                left: [
                    <NavLink
                        exact
                        className="wide"
                        to={'/'}
                    >
                        <Row>
                            <p className="icon">
                                {SVGLogo}
                            </p>
                            <p>Dashboard</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/users'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </p>
                            <p>Users</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/posts'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faNewspaper} />
                            </p>
                            <p>Posts</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/hubs'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faGamepad} />
                            </p>
                            <p>Hubs</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/chats'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </p>
                            <p>Chats</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/tours'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faTrophy} />
                            </p>
                            <p>Tours</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/pets'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faPaw} />
                            </p>
                            <p>Pets</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/acts'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faRocket} />
                            </p>
                            <p>Acts</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/roles'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faEye} />
                            </p>
                            <p>Roles</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/images'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faImage} />
                            </p>
                            <p>Images</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/avatars'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faTheaterMasks} />
                            </p>
                            <p>Avatars</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/icons'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faIcons} />
                            </p>
                            <p>Icons</p>
                        </Row>
                    </NavLink>,
                    <NavLink
                        exact
                        to={'/languages'}
                    >
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faGlobeAsia} />
                            </p>
                            <p>Languages</p>
                        </Row>
                    </NavLink>
                ],
                right: [
                    <Button options={getOptions([
                        {
                            path: '/',
                            title: 'Notifications',
                            component: () => <ViewNotifications />
                        }
                    ])}>
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faBell} />
                            </p>
                            <p>Notifications</p>
                        </Row>
                    </Button>,
                    <Button options={getOptions([
                        {
                            path: '/',
                            title: 'Settings',
                            component: ({ jump, close }) => <SettingsHomeContent jump={jump} close={close} />
                        },
                        {
                            path: '/edit',
                            title: 'Edit Profile',
                            component: ({ jump }) => <SettingsEditProfileContent jump={jump} />
                        },
                        {
                            path: '/privacy-and-security',
                            title: 'Privacy and Security',
                            component: ({ jump }) => <ViewEmpty jump={jump} /> //<SettingsPrivacySecurityContent jump={jump} />
                        },
                        {
                            path: '/language',
                            title: 'Select language',
                            component: ({ back }) => <SettingsLanguageContent back={back} />
                        },
                        {
                            path: '/ask-a-question',
                            title: 'Ask a Question',
                            component: ({ back }) => <SettingsQuestionContent back={back} />
                        }
                    ])}>
                        <Row>
                            <p className="icon">
                                <FontAwesomeIcon icon={faCog} />
                            </p>
                            <p>Settings</p>
                        </Row>
                    </Button>,
                    <Button options={getOptions([
                        {
                            path: '/',
                            title: 'Menu',
                            component: ({ close }) => <ViewMenu close={close} />
                        }
                    ])}>
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                ]
            }} />

            <Switch>
                {routes.map((props, key) =>
                    <Route
                        {...props}
                        key={key}
                        component={() => props.component({ showModal, hideModal })}
                    />
                )}
                <Redirect to="/" />
            </Switch>
            
            <Modal options={{
                routes: content,
                closeByBackground,
                center, hideModal
            }} />
        </React.Fragment>
    )
}

export default () => {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Switch>
            {(isAuthenticated && 
                <Route
                    path="/"
                    component={({ showModal }) =>
                        <Content showModal={showModal} />
                    }
                />
            )}

            {(!isAuthenticated) && (
                <React.Fragment>
                    <Route
                        path="/auth"
                        component={({ showModal }) =>
                            <Auth showModal={showModal} />
                        }
                    />
                    <Redirect to="/auth" />
                </React.Fragment>
            )}
        </Switch>
    )
}