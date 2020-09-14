import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import Select from '../ui/Select'
import HubToggler from '../ui/HubToggler'
import { ADD_OFFER } from '../../utils/queries'

export default ({ status=false, close }) => {
    const state = useSelector(state => state)
    const [action, { loading }] = useMutation(ADD_OFFER)

    const[hub, setHub] = useState({})
    const [_status, _setStatus] = useState('')

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        if (!hub) return

        const variables = {
            title: form.title,
            message: form.message,
            hub: hub.id,
            user: state.user.id,
            status: 'PUBLISHED'
        }

        if (_status) variables.status = _status.value

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.email) && <Alert type="error" message={
                (errors.email.message)
            } />}

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'title',
                disabled: loading,
                placeholder: 'Enter title'
            }} />

            <TextArea options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'message',
                disabled: loading,
                placeholder: 'Enter message'
            }} />

            <HubToggler override={{
                state: hub,
                handler: setHub
            }} />

            {(status) && <Select options={{
                name: 'status',
                value: _status,
                placeholder: 'Choose status',
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
                <p>Add</p>
            </Button>
        </form>
    )
}