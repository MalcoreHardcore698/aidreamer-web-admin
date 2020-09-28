import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faCompass,
    faPaperPlane,
    faTrophy
} from '@fortawesome/free-solid-svg-icons'
import Container from '../ui/Container'
import { setChat } from '../../utils/actions'
import { config } from '../../utils/config'
import SVGLogo from '../../assets/images/logo'

const api = config.get('api')

export default ({ close }) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Container>
            <NavLink
                exact
                to={'/'}
                onClick={() => {
                    dispatch(setChat(null))
                    close()
                }}
            >
                {SVGLogo}
            </NavLink>,
            <NavLink
                exact
                to={'/profile'}
                onClick={() => {
                    dispatch(setChat(null))
                    close()
                }}
            >
                {(state.user && state.user.avatar.path) ? <img
                    className="image"
                    src={(state.user.avatar.path).replace('./', `${api}/`)}
                    alt="Avatar"
                />
                : <p className="undefined"><FontAwesomeIcon icon={faUser} /></p>}
            </NavLink>,
            <NavLink
                exact
                to={'/navigator'}
                onClick={() => {
                    dispatch(setChat(null))
                    close()
                }}
            >
                <FontAwesomeIcon icon={faCompass} />
            </NavLink>,
            <NavLink
                exact
                to={'/chats'}
                onClick={() => {
                    dispatch(setChat(null))
                    close()
                }}
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </NavLink>,
            <NavLink
                exact
                to={'/tours'}
                onClick={() => {
                    dispatch(setChat(null))
                    close()
                }}
            >
                <FontAwesomeIcon icon={faTrophy} />
            </NavLink>
        </Container>
    )
}