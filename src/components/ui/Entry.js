/*
 * COMPONENT: Entry
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import Button from './Button'
import Row from './Row'
import '../styles/Entry.css'
import { config } from '../../utils/config'

const api = config.get('api')

const Manage = ({ manageOffset, handlerView, handlerEdit, handlerDelete }) => {
    return (
        <Row className="manage small" style={{ top: (manageOffset) ? 280 : 15 }}>
            <Button options={{ state: 'icon inactive small', handler: handlerView }}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button options={{ state: 'icon inactive small', handler: handlerEdit }}>
                <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button options={{ state: 'icon inactive small', handler: handlerDelete }}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </Row>
    )
}

export default (props) => {
    const Children = props.children

    const {
        type,
        capacious=true,
        editable,
        manageOffset=false,
        userBar,
        statusBar,
        classNames,
        handler=() => {},
        handlerView=() => {},
        handlerEdit=() => {},
        handlerDelete=() => {}
    } = props.options || {}

    const classes = [
        'ui-entry',
        (editable) ? 'editable' : '',
        (capacious) ? 'capacious' : '',
        (userBar) ? '' : 'no-user-bar',
        classNames
    ]

    const renderUserBar = () => {
        if (!userBar)
            return

        return (
            <div className="user-bar">
                <img
                    className="avatar"
                    src={(userBar.avatar || '').replace('./', `${api}/`)}
                    alt="Avatar"
                />
                <p className={`content${(userBar.rightButton) ? ' top-offset' : ''}`}>
                    <span className="name">{userBar.name}</span>
                    <span className="status">{userBar.status}</span>
                </p>

                {(userBar.rightButton) && (userBar.rightButton)}
            </div>
        )
    }

    const renderContent = () => {
        return (
            <div className="content-wrapper" onClick={handler}>
                {(!Children)
                    ? <Message text="No Content" />
                    : <React.Fragment>
                        <div className="content">{Children}</div>
                        {(editable) && <Manage
                            manageOffset={manageOffset}
                            handlerView={handlerView}
                            handlerEdit={handlerEdit}
                            handlerDelete={handlerDelete}
                        />}
                    </React.Fragment>
                }
            </div>
        )
    }

    const renderStatusBar = () => {
        if (!statusBar)
            return
        
        return (
            <div className={`status-bar${(!statusBar.body && (type === 'ARTICLE')) ? ' no-body' : ''}`}>
                {statusBar.options.map((item, key) => (item) &&
                    <p key={key}>
                        <span className="lite">{item.lite}</span>
                        <span className="dark">{item.dark}</span>
                    </p>
                )}

                {(statusBar.input) && (
                    <div className="input">{statusBar.input}</div>
                )}

                {(statusBar.body) && (
                    <div className="body">{statusBar.body}</div>
                )}
            </div>
        )
    }
    
    return (
        <div className={classes.join(' ')}>
            {renderUserBar()}
            {renderContent()}
            {renderStatusBar()}
        </div>
    )
}