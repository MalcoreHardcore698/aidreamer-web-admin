import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { REGISTER, GET_ALL_ROLES } from '../../utils/queries'

export default ({ user=false, close }) => {
    const [action, { loading }] = useMutation(REGISTER)

    // eslint-disable-next-line
    const [avatar, setAvatar] = useState('')
    const [role, setRole] = useState(null)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            name: form.name,
            phone: form.phone,
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword
        }

        if (role) variables.role = role.value
        if (avatar) variables.avatar = avatar

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {( 
                errors.name ||
                errors.phone ||
                errors.email ||
                errors.password ||
                errors.confirmPassword)
            &&
                <Alert type="error" message={
                    (errors.name.message) ||
                    (errors.phone.message) ||
                    (errors.email.message) ||
                    (errors.password.message) ||
                    (errors.confirmPassword.message)
                } />
            }

            <Input options={{
                ref: register(),
                type: 'text',
                name: 'name',
                disabled: loading,
                placeholder: 'Enter name'
            }} />

            <Input options={{
                ref: register(),
                type: 'text',
                name: 'phone',
                disabled: loading,
                placeholder: 'Enter phone'
            }} />

            <Input options={{
                ref: register(),
                type: 'text',
                name: 'email',
                disabled: loading,
                placeholder: 'Enter email'
            }} />

            <Input options={{
                ref: register(),
                type: 'password',
                name: 'password',
                disabled: loading,
                placeholder: 'Enter password'
            }} />

            <Input options={{
                ref: register(),
                type: 'password',
                name: 'confirmPassword',
                disabled: loading,
                placeholder: 'Enter confirm password'
            }} />

            {(user) && <Query query={GET_ALL_ROLES} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                   <Select options={{
                        defaultValue: role,
                        placeholder: 'Choose role',
                        options: data.allRoles.map(role => ({
                            value: role.id, label: role.name
                        })),
                        onChange: (e) => {
                            setRole(e)
                        }
                    }} />
                )}
            </Query>}

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