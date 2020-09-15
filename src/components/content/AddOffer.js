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
import HubToggler from '../ui/HubToggler'
import { GET_ALL_STATUS, ADD_OFFER } from '../../utils/queries'

export default ({ status=false, close }) => {
    const state = useSelector(state => state)
    const [action, { loading }] = useMutation(ADD_OFFER)

    const[hub, setHub] = useState({})
    const [_status, _setStatus] = useState(null)

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

        if (_status) variables.status = _status

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