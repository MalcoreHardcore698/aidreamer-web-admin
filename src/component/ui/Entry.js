/*
 * COMPONENT: Entry
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import Button from './Button'
import Row from './Row'
import '../styles/Entry.css'

const Manage = ({ manageOffset, handlerEdit, handlerDelete }) => {
    return (
        <Row className="manage" style={{ top: (manageOffset) ? 277 : 15 }}>
            <Button options={{ type: 'icon', handler: handlerEdit }}>
                <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button options={{ type: 'icon', handler: handlerDelete }}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </Row>
    )
}

export default (props) => {
    const Children = props.children

    const {
        capacious=true,
        editable,
        manageOffset=false,
        userBar,
        statusBar,
        classNames,
        handler=() => {},
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
                <img className="avatar" src={userBar.avatar} alt="Avatar" />
                <p className="content">
                    <span className="name">{userBar.name}</span>
                    <span className="status">{userBar.status}</span>
                </p>
            </div>
        )
    }

    const renderContent = () => {
        return (
            <div className="content-wrapper">
                {(!Children)
                    ? <Message text="No Content" />
                    : <React.Fragment>
                        <div className="content">{Children}</div>
                        {(editable) && <Manage
                            manageOffset={manageOffset}
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
            <div className="status-bar">
                {statusBar.map((item, key) =>
                    <p key={key}>
                        <span className="lite">{item.lite}</span>
                        <span className="dark">{item.dark}</span>
                    </p>
                )}
            </div>
        )
    }
    
    return (
        <div className={classes.join(' ')} onClick={handler}>
            {renderUserBar()}
            {renderContent()}
            {renderStatusBar()}
        </div>
    )
}