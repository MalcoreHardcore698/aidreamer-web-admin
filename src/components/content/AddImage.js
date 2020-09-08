import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Dropzone from '../ui/Dropzone'
import { ADD_OFFER } from '../../utils/queries'

export default ({ close }) => {
    const [action] = useMutation(ADD_OFFER)

    const[image, setImage] = useState(null)

    const { handleSubmit, register } = useForm()
    const onSubmit = async () => {
        const variables = { file: image }
        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
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