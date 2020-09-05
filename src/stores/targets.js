import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFire } from '@fortawesome/free-solid-svg-icons'

export default [
    { type: 'date', value: <FontAwesomeIcon icon={faClock} /> },
    { type: 'views', value: <FontAwesomeIcon icon={faFire} /> }
]