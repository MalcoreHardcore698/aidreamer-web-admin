import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFire } from '@fortawesome/free-solid-svg-icons'

export default [
    { value: 'date', label: <FontAwesomeIcon icon={faClock} /> },
    { value: 'views', label: <FontAwesomeIcon icon={faFire} /> }
]