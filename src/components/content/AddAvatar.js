import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Row from '../ui/Row'
import Query from '../ui/Query'
import Alert from '../ui/Alert'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Toggler from '../ui/Toggler'
import Dropzone from '../ui/Dropzone'
import { GET_ALL_HUBS, ADD_AVATAR } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ close }) => {
    const [action, { loading }] = useMutation(ADD_AVATAR)

    const[hub, setHub] = useState(null)
    const[image, setImage] = useState(null)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        if (!hub) return null

        const variables = {
            order: parseInt(form.order),
            complexity: parseInt(form.complexity),
            file: image,
            hub
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.order || errors.complexity) && <Alert type="error" message={
                (errors.order.message || errors.order.complexity)
            } />}

            <Input options={{
                ref: register({ required: true }),
                type: 'number',
                name: 'order',
                disabled: loading,
                placeholder: 'Enter order'
            }} />
            
            <Input options={{
                ref: register({ required: true }),
                type: 'number',
                name: 'complexity',
                disabled: loading,
                placeholder: 'Enter complexity'
            }} />

            <Dropzone options={{
                ref: register,
                name: 'image',
                setImage
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