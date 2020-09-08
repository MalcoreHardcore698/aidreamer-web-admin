import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { ADD_LANGUAGE } from '../../utils/queries'

export default ({ close }) => {
    const [action, { loading }] = useMutation(ADD_LANGUAGE)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            code: form.code
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.code) && <Alert type="error" message={
                (errors.code.message)
            } />}

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'code',
                disabled: loading,
                placeholder: 'Enter code'
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