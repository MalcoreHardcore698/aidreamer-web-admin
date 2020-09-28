import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Row from './Row'
import Query from './Query'
import Avatar from './Avatar'
import Toggler from './Toggler'
import { GET_ALL_HUBS } from '../../utils/queries'
import { setCurrentHub } from '../../utils/actions'
import 'moment/locale/ru'

export default () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Query query={GET_ALL_HUBS} pseudo={{ height: 45, count: 6 }}>
            {({ data }) => (
                <Toggler all options={{
                    name: 'hub',
                    setValue: (_, target) => dispatch(setCurrentHub(target)),
                    initialState: state.filters.currentHub,
                    initialSlicedFactor: 4,
                    initialOptions: data.allHubs.map(hub => ({
                        value: hub.id,
                        label: (
                            <Row key={hub.id}>
                                <Avatar avatar={{ path: hub.icon.path }} properties={['circle']} />
                                <p>{hub.title}</p>
                            </Row>
                        )
                    }))
                }} />
            )}
        </Query>
    )
}