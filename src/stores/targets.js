import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFire } from '@fortawesome/free-solid-svg-icons'

export default [
    { type: 'all', value: <p>All</p> },
    { type: 'last', value: <FontAwesomeIcon icon={faClock} /> },
    { type: 'popular', value: <FontAwesomeIcon icon={faFire} /> }
]