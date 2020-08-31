/*
 * COMPONENT: Skeleton
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import Skeleton from 'react-skeleton-loader'

export default ({ component, options }) => {
    const classes = [
        'ui-skeleton',
        component
    ]

    return (
        <div className={classes.join(' ')}>
            <Skeleton {...options} />
        </div>
    )
}