/*
 * COMPONENT: Notify
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faExclamationTriangle,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Notify.css'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ options }) => {
    const {
        // admin, client
        area,
        type,
        avatar,
        message
    } = options

    const classes = [
        'ui-notify',
        area, type
    ]

    const getIcon = () => {
        switch (type) {
            case 'success':
                return faCheck
            case 'warning':
                return faExclamationTriangle
            default:
                return faTimes
        }
    }

    const renderMedia = () => {
        switch (area) {
            case 'admin':
                return <FontAwesomeIcon icon={getIcon()} />
            default:
                return <img src={(avatar).replace('./', `${api}/`)} alt="Avatar" />
        }
    }

    const renderMessage = () => {
        const length = message.length
        const msg = (length > 25) ? `${message.slice(0, 25)}...` : message
        return <p>{msg}</p>
    }

    return (
        <div className={classes.join(' ')}>
            <div className="icon">
                {renderMedia()}
            </div>
            <div className="message">
                {renderMessage()}
            </div>
        </div>
    )
}