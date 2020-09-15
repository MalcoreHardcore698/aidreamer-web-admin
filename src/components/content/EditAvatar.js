import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Alert from '../ui/Alert'
import Input from '../ui/Input'
import Button from '../ui/Button'
import HubToggler from '../ui/HubToggler'
import Dropzone from '../ui/Dropzone'
import { ADD_AVATAR } from '../../utils/queries'

export default ({ avatar, close }) => {
    const [action, { loading }] = useMutation(ADD_AVATAR)

    const[hub, setHub] = useState(avatar.hub)
    const[image, setImage] = useState(null)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        if (!hub) return null

        const variables = {
            order: parseInt(form.order),
            complexity: parseInt(form.complexity),
            file: image,
            hub: hub.id
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.order || errors.complexity) && <Alert type="error" message={
                (errors.order.message || errors.order.message)
            } />}

            <Input options={{
                ref: register({
                    required: true,
                    pattern: {
                        message: 'Order is required'
                    }
                }),
                type: 'number',
                name: 'order',
                defaultValue: avatar.order || '',
                disabled: loading,
                placeholder: 'Enter order'
            }} />
            
            <Input options={{
                ref: register({
                    required: true,
                    pattern: {
                        message: 'Complexity is required'
                    }
                }),
                type: 'number',
                name: 'complexity',
                defaultValue: avatar.complexity || '',
                disabled: loading,
                placeholder: 'Enter complexity'
            }} />

            <Dropzone options={{
                ref: register,
                name: 'image',
                value: avatar.path,
                setImage
            }} />

            <HubToggler override={{
                state: hub,
                handler: setHub
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