/*
 * COMPONENT: Search
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Row from './Row'
import '../styles/Search.css'

const Search = ({ options }) => {
    const {
        type="text",
        placeholder='Search',
        classNames,
        onChange=() => {}
    } = options || {}

    const classes = [
        'ui-search',
        classNames
    ]

    return (
        <input
            type={type}
            className={classes.join(' ')}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default ({ options, filter }) => {
    return (
        (filter) ? <Row type="flex search">
            <Search options={options} />
            <Button options={{ type: 'icon' }}>
                <FontAwesomeIcon icon={faFilter} />
            </Button>
        </Row> : <Search options={options} />
    )
}