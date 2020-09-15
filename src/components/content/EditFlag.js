import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Dropzone from '../ui/Dropzone'
import { EDIT_FLAG } from '../../utils/queries'

export default ({ icon, close }) => {
    const [action] = useMutation(EDIT_FLAG)

    const[image, setImage] = useState(null)

    const { handleSubmit, register } = useForm()
    const onSubmit = async () => {
        const variables = {
            file: image
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            <Dropzone options={{
                ref: register,
                name: 'image',
                value: icon.path,
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