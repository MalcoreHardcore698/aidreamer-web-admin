import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Dropzone from '../ui/Dropzone'
import { EDIT_OFFER } from '../../utils/queries'

export default ({ image, close }) => {
    const [action] = useMutation(EDIT_OFFER)

    const[_image, _setImage] = useState(null)

    const { handleSubmit, register } = useForm()
    const onSubmit = async () => {
        const variables = { file: _image }
        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            <Dropzone options={{
                ref: register,
                name: 'image',
                value: image.path,
                setImage: _setImage
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