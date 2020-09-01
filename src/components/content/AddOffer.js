import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Query from '../ui/Query'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { ADD_OFFER, GET_ALL_HUBS, GET_ALL_USERS } from '../../utils/queries'

export default ({ user=false, status=false, close }) => {
    const state = useSelector(state => state)

    const [title, setTitle] = useState('')
    const [message, serMessage] = useState('')
    const [hub, setHub] = useState('')
    const [_user, _setUser] = useState('')
    const [_status, _setStatus] = useState('')

    return (
        <Container>
            <Input options={{
                type: 'text',
                name: 'title',
                placeholder: 'Enter title',
                onChange: (e) => {
                    setTitle(e.target.value)
                }
            }} />

            <Input options={{
                type: 'text',
                name: 'message',
                placeholder: 'Enter message',
                onChange: (e) => {
                    serMessage(e.target.value)
                }
            }} />

            <Query query={GET_ALL_HUBS}>
                {({ data }) => (
                    <Select options={{
                        name: 'hubs',
                        value: hub,
                        options: data.allHubs.map(h => ({
                            value: h.id,
                            label: h.title
                        })),
                        onChange: (e) => {
                            setHub(e)
                        }
                    }} />
                )}
            </Query>

            {(status) && <Query query={GET_ALL_USERS}>
                {({ data }) => (
                    <Select options={{
                        name: 'users',
                        value: _user,
                        options: data.allUsers.map(u => ({
                            value: u.id,
                            label: u.name
                        })),
                        onChange: (e) => {
                            _setUser(e)
                        }
                    }} />
                )}
            </Query>}

            {(status) && <Select options={{
                name: 'status',
                value: _status,
                options: [
                    { value: 'MODERATION', label: 'MODERATION' },
                    { value: 'PUBLISHED', label: 'PUBLISHED' }
                ],
                onChange: (e) => {
                    _setStatus(e)
                }
            }} />}

            <Mutation query={ADD_OFFER}>
                {({ action }) => (
                    <Button options={{
                        type: 'inactive',
                        handler: async () => {
                            const variables = {
                                title, message,
                                hub: hub.value,
                                user: state.user.id,
                                status: 'PUBLISHED'
                            }

                            if (user) variables.user = _user.value
                            if (status) variables.status = _status.value

                            await action({ variables })

                            close()
                        }
                    }}>
                        <p>Add</p>
                    </Button>
                )}
            </Mutation>
        </Container>
    )
}