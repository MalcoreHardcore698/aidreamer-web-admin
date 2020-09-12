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
import Dropzone from '../ui/Dropzone'
import Toggler from '../ui/Toggler'
import { GET_ALL_HUBS, ADD_ARTICLE } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ status=false, close }) => {
    const state = useSelector(state => state)
    const [action, { loading }] = useMutation(ADD_ARTICLE)

    const[hub, setHub] = useState(null)
    const[image, setImage] = useState(null)
    const [_status, _setStatus] = useState(null)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        if (!hub) return

        const variables = {
            author: state.user.name,
            title: form.title,
            description: form.description,
            body: form.body, hub,
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