import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUsers,
    faNewspaper,
    faAddressBook,
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
    faFlag,
    faCog
} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from './AuthContext'

import Row from './ui/Row'
import Navigation from './ui/Navigation'
import Modal from './ui/Modal'

import ViewEmpty from './content/ViewEmpty'
import ViewNotifications from './content/ViewNotifications'
import {
    SettingsEditProfileContent,
    SettingsHomeContent,
    SettingsQuestionContent,
    SettingsLanguageContent
} from './content/ViewSettings'

import Auth from './Auth'

import SVGLogo from '../assets/images/logo'

import routes from '../routes'
import '../assets/styles/App.css'

function getButton(name, handler, routes, icon) {
    return ({
        options: {
            state: 'inactive',
            handler: () => handler(routes, true)
        },
        component: (
            <Row>
                <FontAwesomeIcon icon={icon} />
                <p>{name}</p>
            </Row>
        )
    })
}

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
                links: [
                    {
                        links: [
                            {
                                path: '/',
                                type: 'wide',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            {SVGLogo}
                                        </p>
                                        <p>Dashboard</p>
                                    </Row>
                                )
                            }
                        ]
                    },
                    {
                        title: 'Content',
                        links: [
                            {
                                path: '/users',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faUsers} />
                                        </p>
                                        <p>Users</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/articles',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faNewspaper} />
                                        </p>
                                        <p>Articles</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/offers',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faAddressBook} />
                                        </p>
                                        <p>Offers</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/hubs',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faGamepad} />
                                        </p>
                                        <p>Hubs</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/chats',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </p>
                                        <p>Chats</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/tours',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faTrophy} />
                                        </p>
                                        <p>Tours</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/pets',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faPaw} />
                                        </p>
                                        <p>Pets</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/acts',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faRocket} />
                                        </p>
                                        <p>Acts</p>
                                    </Row>
                                )
                            }
                        ]
                    },
                    {
                        title: 'Settings',
                        links: [
                            {
                                path: '/roles',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faEye} />
                                        </p>
                                        <p>Roles</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/images',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faImage} />
                                        </p>
                                        <p>Images</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/avatars',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faTheaterMasks} />
                                        </p>
                                        <p>Avatars</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/icons',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faIcons} />
                                        </p>
                                        <p>Icons</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/flags',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faFlag} />
                                        </p>
                                        <p>Flags</p>
                                    </Row>
                                )
                            },
                            {
                                path: '/languages',
                                component: (
                                    <Row>
                                        <p className="icon">
                                            <FontAwesomeIcon icon={faGlobeAsia} />
                                        </p>
                                        <p>Languages</p>
                                    </Row>
                                )
                            }
                        ]
                    }
                ],
                buttons: [
                    getButton('Notifications', showModal, [
                        {
                            path: '/',
                            title: 'Notifications',
                            component: () => <ViewNotifications />
                        }
                    ], faBell),
                    getButton('Settings', showModal, [
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
                    ], faCog)
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