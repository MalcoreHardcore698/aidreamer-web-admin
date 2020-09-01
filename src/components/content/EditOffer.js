import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Query from '../ui/Query'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { EDIT_OFFER, GET_ALL_HUBS, GET_ALL_USERS } from '../../utils/queries'

export default ({ user=false, status=false, offer, close }) => {
    const state = useSelector(state => state)

    const [title, setTitle] = useState(offer.title)
    const [message, serMessage] = useState(offer.message)
    const [hub, setHub] = useState({ value: offer.hub.id, label: offer.hub.title })
    const [_user, _setUser] = useState({ value: offer.user.id, label: offer.user.name })
    const [_status, _setStatus] = useState({ value: offer.status, label: offer.status })

    return (
        <Container>
            <Input options={{
                type: 'text',
                value: title,
                placeholder: 'Enter title',
                onChange: (e) => {
                    setTitle(e.target.value)
                }
            }} />

            <Input options={{
                type: 'text',
                value: message,
                placeholder: 'Enter message',
                onChange: (e) => {
                    serMessage(e.target.value)
                }
            }} />

            <Query query={GET_ALL_HUBS}>
                {({ data }) => (
                    <Select options={{
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

            {(user) && <Query query={GET_ALL_USERS}>
                {({ data }) => (
                    <Select options={{
                        value: _user,
                        options: data.allUsers.map(user => ({
                            value: user.id,
                            label: user.name
                        })),
                        onChange: (e) => {
                            _setUser(e)
                        }
                    }} />
                )}
            </Query>}

            {(status) && <Select options={{
                value: _status,
                options: [
                    { value: 'MODERATION', label: 'MODERATION' },
                    { value: 'PUBLISHED', label: 'PUBLISHED' }
                ],
                onChange: (e) => {
                    _setStatus(e)
                }
            }} />}

            <Mutation query={EDIT_OFFER}>
                {({ action }) => (
                    <Button options={{
                        type: 'inactive',
                        handler: async () => {
                            const variables = {
                                id: offer.id,
                                title, message,
                                user: state.user.id,
                                hub: hub.value,
                                status: 'PUBLISHED'
                            }

                            if (user) variables.user = _user.value
                            if (status) variables.status = _status.value

                            await action({ variables })

                            close()
                        }
                    }}>
                        <p>Apply</p>
                    </Button>
                )}
            </Mutation>
        </Container>
    )
}