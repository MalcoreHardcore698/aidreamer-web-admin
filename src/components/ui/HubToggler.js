/*
 * COMPONENT: Hub Toggler
 * 
 * MISSION: ...
 *
**/

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWindowSize } from '../../hooks/window.size.hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import Query from './Query'
import Subscription from './Subscription'
import Row from './Row'
import Container from './Container'
import Button from './Button'
import Dropdown from './Dropdown'
import Toggler from './Toggler'
import List from './List'
import {
    GET_ALL_HUBS,
    SUB_ALL_HUBS
} from '../../utils/queries'
import { setCurrentHub } from '../../utils/actions'

export default ({ override, all }) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const size = useWindowSize()

    const [hubDropdown, setHubDropdown] = useState(false)
    const [slicedIndex, setSlicedIndex] = useState(2)

    useEffect(() => {
        if (size.width <= 580) {
            setSlicedIndex(0)
        } else {
            setSlicedIndex(2)
        }
    }, [size.width])

    return (
        <Query query={GET_ALL_HUBS} variables={{ status: 'PUBLISHED' }} pseudo={{ height: 45, count: 6 }}>
            {({ data, refetch }) => (data.allHubs.length > 1) && (
                <Subscription query={SUB_ALL_HUBS} variables={{ status: 'PUBLISHED' }} refetch={refetch}>
                    {({ subData }) => {
                        const hubs = ((subData && subData.hubs) || (data && data.allHubs))

                        /*
                        const sorted = (override) ? 
                            (hubs.slice(0, slicedIndex)
                                .find(h => h.id === override.state.id))
                            ? hubs : [
                                override.state,
                                ...hubs.filter(h => h.id !== override.state.id)
                            ] : hubs
                        */

                        const slicedStarts = hubs.slice(0, slicedIndex)
                        const slicedEnds = hubs.slice(slicedIndex)

                        return (
                            <Toggler options={{
                                state: (override) ? override.state : state.filters.currentHub,
                                handler: (item) => {
                                    if (override) {
                                        override.handler(item)
                                    }
                                    else dispatch(setCurrentHub(item))
                                    setHubDropdown(false)
                                },
                                targets: [
                                    (all) && ({
                                        type: 'all',
                                        value: <Row><p>All</p></Row>
                                    }),
                                    ...slicedStarts.map((hub, key) => ({
                                        type: hub,
                                        value: (
                                            <Row key={key}>
                                                <p>{hub.title}</p>
                                            </Row>
                                        )})),
                                    {
                                        type: 'erase',
                                        classNames: 'dropdown',
                                        value: (
                                            <Container clear sticky>
                                                <Button options={{
                                                    state: 'inactive',
                                                    handler: () => setHubDropdown(!hubDropdown)
                                                }}>
                                                    <FontAwesomeIcon icon={faEllipsisH} />
                                                </Button>

                                                <Dropdown options={{ dropdown: hubDropdown, styles: { right: 0 } }}>
                                                    <List options={{
                                                        list: slicedEnds.map(h => ({ id: h.id, label: h.title})),
                                                        state: (override) ? override.state : state.filters.currentHub,
                                                        handlerItem: (item) => {
                                                            if (override) {
                                                                override.handler(item)
                                                            }
                                                            else dispatch(setCurrentHub(item))
                                                            setHubDropdown(false)
                                                        }
                                                    }}>
                                                        {({ item }) => (
                                                            <React.Fragment>
                                                                <p className="name">{item.label}</p>
                                                            </React.Fragment>
                                                        )}
                                                    </List>
                                                </Dropdown>
                                            </Container>
                                        )
                                    }
                                ]}}
                            />
                        )
                    }}
                </Subscription>
            )}
        </Query>
    )
}