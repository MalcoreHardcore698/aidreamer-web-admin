import React from 'react'
import { CSSTransition } from 'react-transition-group'
import '../styles/Transition.css'

export default (props) => {
    const Children = props.children
    const showContent = props.showContent
    const animation = props.animation || 'default'
    const duration = props.duration || 300
    const unmountOnExit = props.unmountOnExit || true
    const handlerEnter = props.handlerEnter || null
    const handlerExited = props.handlerExited || null

    return (
        <CSSTransition
            in={showContent}
            timeout={duration}
            classNames={animation}
            onEnter={handlerEnter}
            onExited={handlerExited}
            unmountOnExit={unmountOnExit}
        >
            {Children}
        </CSSTransition>
    )
}