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
import Dropzone from '../ui/Dropzone'
import HubToggler from '../ui/HubToggler'
import { GET_ALL_STATUS, ADD_ARTICLE } from '../../utils/queries'

export default ({ status=false, close }) => {
    const state = useSelector(state => state)
    const [action, { loading }] = useMutation(ADD_ARTICLE)

    const[hub, setHub] = useState({})
    const[image, setImage] = useState(null)
    const [_status, _setStatus] = useState(null)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        if (!hub) return

        const variables = {
            author: state.user.name,
            title: form.title,
            description: form.description,
            body: form.body, hub: hub.id,
            status: 'PUBLISHED'
        }

        if (image) variables.image = image
        if (form.status) variables.status = form.status
        
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
                disabled: loading,
                placeholder: 'Enter title'
            }} />

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'description',
                disabled: loading,
                placeholder: 'Enter description'
            }} />

            <TextArea options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'body',
                disabled: loading,
                placeholder: 'Enter body'
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

            <Dropzone options={{
                ref: register,
                name: 'image',
                setImage
            }} />

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