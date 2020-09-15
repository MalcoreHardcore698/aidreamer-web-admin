import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import List from '../ui/List'
import Input from '../ui/Input'
import Toggler from '../ui/Toggler'
import { GET_ALL_STATUS, GET_ALL_ICONS, ADD_HUB } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ status=false, close }) => {
    const [action, { loading }] = useMutation(ADD_HUB)

    const[image, setImage] = useState({})
    const [_status, _setStatus] = useState('')

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            title: form.title,
            description: form.description,
            slogan: form.slogan,
            color: form.color,
            status: 'PUBLISHED'
        }

        if (_status) variables.status = _status

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.title || errors.description || errors.slogan || errors.color) && <Alert type="error" message={
                (errors.title?.message || errors.description?.message || errors.slogan?.message || errors.color?.message)
            } />}

            <Input options={{
                ref: register({
                    required: 'Title is required',
                }),
                name: 'title',
                type: 'text',
                placeholder: 'Enter title',
                disabled: loading
            }} />

            <Input options={{
                ref: register({
                    required: 'Description is required',
                }),
                name: 'description',
                type: 'text',
                placeholder: 'Enter description',
                disabled: loading
            }} />

            <Input options={{
                ref: register({
                    required: 'Slogan is required',
                }),
                name: 'slogan',
                type: 'text',
                placeholder: 'Enter slogan',
                disabled: loading
            }} />

            <Input options={{
                ref: register({
                    required: 'Color is required',
                }),
                name: 'color',
                type: 'color',
                placeholder: 'Choose color',
                disabled: loading
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
                <p>Add</p>
            </Button>
        </form>
    )
}