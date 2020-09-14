import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Alert from '../ui/Alert'
import Input from '../ui/Input'
import Button from '../ui/Button'
import HubToggler from '../ui/HubToggler'
import Dropzone from '../ui/Dropzone'
import { ADD_AVATAR } from '../../utils/queries'

export default ({ close }) => {
    const [action, { loading }] = useMutation(ADD_AVATAR)

    const[hub, setHub] = useState({})
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

            <HubToggler override={{
                state: hub,
                handler: setHub
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