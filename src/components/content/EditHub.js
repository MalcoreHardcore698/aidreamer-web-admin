import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Button from '../ui/Button'
import Input from '../ui/Input'
import List from '../ui/List'
import TextArea from '../ui/TextArea'
import Toggler from '../ui/Toggler'
import { GET_ALL_STATUS, GET_ALL_ICONS, EDIT_HUB } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ status=false, hub, close }) => {
    const [action, { loading }] = useMutation(EDIT_HUB)

    const[image, setImage] = useState(hub.icon || {})
    const [_status, _setStatus] = useState(hub.status)

    const { handleSubmit, register } = useForm()

    const onSubmit = async (form) => {
        const variables = {
            id: hub._id,
            title: form.title,
            description: form.description,
            slogan: form.slogan,
            color: form.color
        }

        if (image) variables.icon = image.id
        if (form.status) variables.status = form.status

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'title',
                defaultValue: hub.title || '',
                disabled: loading,
                placeholder: 'Enter title'
            }} />
            
            <TextArea options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'description',
                defaultValue: hub.description || '',
                disabled: loading,
                placeholder: 'Enter description'
            }} />

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'slogan',
                defaultValue: hub.slogan || '',
                disabled: loading,
                placeholder: 'Enter slogan'
            }} />

            <Input options={{
                ref: register({ required: true }),
                type: 'color',
                name: 'slogan',
                defaultValue: hub.color || '',
                disabled: loading,
                placeholder: 'Enter color'
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

            <Query query={GET_ALL_ICONS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <List options={{
                        type: 'grid',
                        state: image,
                        list: data.allIcons,
                        handlerItem: setImage
                    }}>
                        {({ item }) => (
                            <img
                                className="image"
                                src={(item.path).replace('./', `${api}/`)}
                                alt="Hub"
                            />
                        )}
                    </List>
                )}
            </Query>

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