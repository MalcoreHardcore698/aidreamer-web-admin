import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Select from '../ui/Select'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { ADD_ROLE, GET_ALL_PERMITIONS } from '../../utils/queries'

export default ({ close }) => {
    const [permissions, setPermissions] = useState(null)
    const [action, { loading }] = useMutation(ADD_ROLE)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            name: form.name,
            permissions: permissions.map(p => p.value)
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.name) && <Alert type="error" message={errors.name.message} />}

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'name',
                disabled: loading,
                placeholder: 'Enter name'
            }} />

            <Query query={GET_ALL_PERMITIONS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <Select options={{
                        value: permissions,
                        placeholder: 'Choose permissions',
                        options: data.allPermissions.map(p => ({
                            value: p,
                            label: p
                        })),
                        closeMenuOnSelect: false,
                        isMulti: true,
                        onChange: (e) => {
                            setPermissions(e)
                        }
                    }} />
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