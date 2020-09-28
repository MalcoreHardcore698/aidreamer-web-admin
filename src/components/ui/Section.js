/*
 * COMPONENT: Section
 * 
 * MISSION: ...
 *
**/

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import Button from './Button'
import Search from './Search'
import Toggler from './Toggler'
import Row from './Row'
import '../styles/Section.css'

const Manage = ({ filter, targets }) => {
    return (
        <Row>
            <Search />
            <Toggler options={{
                initialState: targets[0].value,
                initialOptions: targets
            }} />
            {(filter) && (
                 <Button options={{
                    state: 'inactive icon',
                    handler: () => { }
                }}>
                    <FontAwesomeIcon icon={faFilter} />
                </Button>
            )}
        </Row>
    )
}

export default (props) => {
    const Children = props.children
    const [currentFilter, setCurrentFilter] = useState('date')

    const {
        type,
        name='default',
        title=null,
        subtitle=null,
        manage=true, filter=false,
        targets=[]
    } = props.options || {}

    const classes = [
        'ui-section', type,
        name, (manage) ? 'manage' : ''
    ]

    return (
        <section className={classes.join(' ')}>
            {(title || manage) && (
                <div className="headline">
                    {(title) && (
                        <h2>
                            {(title) && <span className="title">{title}</span>}
                            {(subtitle) && <span className="subtitle">{subtitle}</span>}
                        </h2>
                    )}
                    {(manage) && <Manage
                        filter={filter}
                        targets={targets}
                        state={currentFilter}
                        handler={setCurrentFilter}
                    />}
                </div>
            )}
            <div className="content">
                {<Children filter={currentFilter} /> || <Message text="No Content" padding />}
            </div>
        </section>
    )
}