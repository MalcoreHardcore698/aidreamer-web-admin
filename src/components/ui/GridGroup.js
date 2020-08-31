/*
 * COMPONENT: Group
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import Participant from './Participant'

export default ({ participants }) => {
    return (
        <div className="group">
            <div className="headers">
                <div className="row">
                    <p className="number">№</p>
                </div>

                <div className="row">
                    <p className="player">Игрок</p>
                </div>

                <div className="row">
                    <p className="block">П</p>
                    <p className="block">Н</p>
                    <p className="block">В</p>
                </div>
            </div>
            <Participant participant={participants[0]} stats />
            <Participant participant={participants[1]} stats />
            <Participant participant={participants[0]} stats />
            <Participant participant={participants[1]} stats />
        </div>
    )
}