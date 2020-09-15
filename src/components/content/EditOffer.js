import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import Toggler from '../ui/Toggler'
import Select from '../ui/Select'
import HubToggler from '../ui/HubToggler'
import { GET_ALL_USERS, GET_ALL_STATUS, EDIT_OFFER } from '../../utils/queries'

export default ({ user=false, status=false, offer, close }) => {
    const state = useSelector(state => state)
    const [action, { loading }] = useMutation(EDIT_OFFER)

    const[hub, setHub] = useState(offer.hub)
    const [_user, _setUser] = useState({ value: offer.user.id, label: offer.user.name })
    const [_status, _setStatus] = useState(offer.status)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        if (!hub) return

        const variables = {
            id: offer._id || offer.id,
            title: form.title,
            message: form.message,
            hub: hub.id,
            user: state.user.id,
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

            <HubToggler override={{
                state: hub,
                handler: setHub
            }} />

            {(status) && <Query query={GET_ALL_STATUS}>
                {({ data }) => (
                    <Toggler options={{
                        state: _status,
                        handler: _setStatus,
                        targets: [
                            ...data.allStatus.map((item, key) => ({
                                type: item,
                                value: (
                                    <Row key={key}>
                                        <p>{item}</p>
                                    </Row>
                                )}))
                        ]}}
                    />
                )}
            </Query>}

            {(user) && <Query query={GET_ALL_USERS}>
                {({ data }) => (
                    <Select options={{
                        name: 'users',
                        value: _user,
                        placeholder: 'Choose user',
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