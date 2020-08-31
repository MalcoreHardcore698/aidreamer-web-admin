/*
 * COMPONENT: AsyncSection
 * 
 * MISSION: Fetching data and rendering in
 * Section components
 * 
 * IMPORTANT: Must be installed Apollo packages
 * More: https://www.apollographql.com/docs/react/
 *
**/

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Message from './Message'
import Search from './Search'
import Slider from './Slider'
import Skeleton from './Skeleton'
import Message from './Message'
import '../styles/Section.css'

const Manage = ({ filter, targets }) => {
    return (
        <Row>
            <Search filter={filter} />
            <Slider options={{ targets }} />
        </Row>
    )
}

const Query = ({ query, variables, component }) => {
    const { loading, error, data } = useQuery(query, { variables })

    const renderContent = () => component && component(data)

    if (loading) return <Skeleton component="section" />
    if (error) return <Message type="error" />

    return renderContent()
}

export default (props) => {
    const {
        name='default',
        headline='Section Name',
        query=null,
        variables={},
        manage, targets=[],
        filter
    } = props.options || {}

    const classes = [
        'ui-section',
        name
    ]

    return (
        <section className={classes.join(' ')}>
            <div className="headline">
                <h2>{headline}</h2>
                {(manage) && <Manage
                    filter={filter}
                    targets={targets}
                />}
            </div>

            {(!query) ? props.children && props.children()
                : <Query
                    query={query}
                    variables={variables}
                    component={props.children}
                />}
        </section>
    )
}