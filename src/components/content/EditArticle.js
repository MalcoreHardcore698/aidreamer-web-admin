import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
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
import { GET_ALL_HUBS, EDIT_ARTICLE } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ status=false, article, close }) => {
    const [action, { loading }] = useMutation(EDIT_ARTICLE)

    const[hub, setHub] = useState(article.hub.id)
    const[image, setImage] = useState(null)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        if (!hub) return

        const variables = {
            id: article.id,
            title: form.title,
            description: form.description,
            body: form.body, hub
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
                defaultValue: article.title || '',
                disabled: loading,
                placeholder: 'Enter title'
            }} />

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'description',
                defaultValue: article.description || '',
                disabled: loading,
                placeholder: 'Enter description'
            }} />

            <TextArea options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'body',
                defaultValue: article.body || '',
                disabled: loading,
                placeholder: 'Enter body'
            }} />

            <Query query={GET_ALL_HUBS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <Toggler options={{
                        type: 'auto',
                        state: hub || article.hub.id,
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
                value: article.status,
                placeholder: 'Choose status',
                options: [
                    { value: 'MODERATION', label: 'MODERATION' },
                    { value: 'PUBLISHED', label: 'PUBLISHED' }
                ]
            }} />}

            <Dropzone options={{
                ref: register,
                name: 'image',
                value: article.image.path,
                setImage
            }} />

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