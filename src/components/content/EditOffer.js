import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Row from '../ui/Row'
import Query from '../ui/Query'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import Select from '../ui/Select'
import Toggler from '../ui/Toggler'
import { GET_ALL_HUBS, GET_ALL_USERS, EDIT_OFFER } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ user=false, status=false, offer, close }) => {
    const state = useSelector(state => state)
    const [action, { loading }] = useMutation(EDIT_OFFER)

    const[hub, setHub] = useState(offer.hub.id)
    const [_user, _setUser] = useState(offer.user.id)
    const [_status, _setStatus] = useState(offer.status)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        if (!hub) return

        const variables = {
            id: offer.id,
            title: form.title,
            message: form.message,
            hub, user: state.user.id,
            status: 'PUBLISHED'
        }

        if (_user) variables.user = _user
        if (_status) variables.status = _status

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.email || errors.username) && <Alert type="error" message={
                (errors.email.message) || (errors.username.message)
            } />}

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'title',
                defaultValue: offer.title || '',
                disabled: loading,
                placeholder: 'Enter title'
            }} />

            <TextArea options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'message',
                defaultValue: offer.message || '',
                disabled: loading,
                placeholder: 'Enter message'
            }} />

            <Query query={GET_ALL_HUBS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <Toggler options={{
                        type: 'auto',
                        state: hub,
                        handler: setHub,
                        targets: (data && data.allHubs).map((hub, key) => ({
                            type: hub.id,
                            value: (
                                <Row key={key}>
                                    {(hub.icon && hub.icon.path) &&
                                    <div className="icon">
                                        <img src={(hub.icon.path).replace('./', `${api}/`)} alt={hub.title} />
                                    </div>}
                                    <p>{hub.title}</p>
                                </Row>
                            )}))
                        }}
                    />
                )}
            </Query>

            {(user) && <Query query={GET_ALL_USERS}>
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

            <Button options={{
                type: 'submit',
                state: 'inactive',
                classNames: 'grow'
            }}>
                <p>Save</p>
            </Button>
        </form>
    )
}