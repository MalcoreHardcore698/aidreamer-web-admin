/*
 * COMPONENT: Modal
 * 
 * MISSION: Dynamic Modal with feture navigation
 * by pages and unlimited depths. Given Modal
 * haven't to need in 'react-router' or 'react-router-dom.
 * This custom Switch, Route and Link for scalable and
 * dynamical app
 *
**/

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../styles/Modal.css'
import Transition from './Transition'
import Button from './Button'

function getPath(navigator) {
    if (!navigator || navigator.length === 0)
        return null

    return navigator[navigator.length - 1]
}

const Switch = (props) => {
    const Childrens = props.children
    if (!Childrens) return null
    
    const path = props.path

    let Child = null
    for (const child of Childrens) {
        if (path === child.props.path) {
            Child = child
            break
        }
    }
    return Child
}

const Route = ({ component, close, jump }) => {
    const Compoent = component
    return <Compoent
        close={close}
        jump={jump}
    />
}

export default ({ options }) => {
    const [navigator, setNavigator] = useState(['/'])
    const [content, setContent] = useState(false)
    const [animation, setAnimation] = useState(null)

    const {
        title,
        home,
        routes,
        hideModal,
        closeByBackground=true
    } = options

    const classes = [
        'ui-modal'
    ]

    const transitions = {
        fade: {
            showContent: (routes) ? true : false,
            animation: 'fade',
            handlerEnter: () => setContent(true),
            handlerExit: () => setContent(false),
            duration: 150
        },
        swing: {
            showContent: (content),
            animation: 'swing',
            duration: 150
        }
    }

    const getTitle = () => {
        function compare(route) {
            return (route.path === getPath(navigator))
        }

        const title = routes?.find(route => compare(route))?.title

        return title || 'Default Title'
    }

    const handlerBack = () => {
        setAnimation('slideOutRight')
        setTimeout(() => {
            setNavigator([
                ...navigator.filter((e, i) => (i !== (navigator.length - 1)))
            ])
            setAnimation('slideInLeft')
        }, 150)
    }
    const handlerJump = (path) => {
        setAnimation('slideOutLeft')
        setTimeout(() => {
            setNavigator([
                ...navigator,
                path
            ])
            setAnimation('slideInRight')
        }, 150)
    }
    const handlerClose = () => {
        setContent(false)
        setAnimation(null)
        
        setTimeout(() => {
            setNavigator(['/'])
            hideModal()
        }, 100)
    }

    return (
        <Transition {...transitions.fade}>
            <div className={classes.join(' ')}>
                <div
                    className={`background${(!closeByBackground) ? ' clear' : ''}`}
                    onClick={(closeByBackground) && handlerClose}
                ></div>

                <Transition {...transitions.swing}>
                    <div className={`wrapper animate${(animation) ? ` ${animation}` : ''}`}>
                        <div className="headline">
                            {(navigator.length > 1) && <Button options={{
                                state: 'icon',
                                lockdown: true,
                                handler: () => handlerBack()
                            }}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Button>}
                            <h1>{(title && !routes) ? title : getTitle()}</h1>
                        </div>

                        {(home && !routes) ? home
                        : <Switch path={getPath(navigator)}>
                            {routes?.map((props, key) =>
                                <Route key={key} {...props} close={handlerClose} jump={handlerJump} />
                            )}
                        </Switch>}
                    </div>
                </Transition>
            </div>
        </Transition>
    )
}