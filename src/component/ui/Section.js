/*
 * COMPONENT: Section
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import Message from './Message'
import Search from './Search'
import Toggler from './Toggler'
import Row from './Row'
import '../styles/Section.css'

const Manage = ({ filter, targets }) => {
    return (
        <Row>
            <Search filter={filter} />
            <Toggler options={{ targets }} />
        </Row>
    )
}

export default (props) => {
    const Children = props.children

    const {
        name='default',
        title='Events',
        subtitle='124',
        manage=true, filter=false,
        targets=[]
    } = props.options || {}

    const classes = [
        'ui-section',
        name, (manage) ? 'manage' : ''
    ]

    return (
        <section className={classes.join(' ')}>
            <div className="headline">
                <h2>
                    <span className="title">{title}</span>
                    <span className="subtitle">{subtitle}</span>
                </h2>
                {(manage) && <Manage
                    filter={filter}
                    targets={targets}
                />}
            </div>
            <div className="content">
                {Children || <Message text="No Content" padding />}
            </div>
        </section>
    )
}