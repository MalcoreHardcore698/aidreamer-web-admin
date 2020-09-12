import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Alert from '../ui/Alert'
import List from '../ui/List'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { EDIT_USER, GET_ALL_ROLES, GET_ALL_AVATARS } from '../../utils/queries'
import { config } from '../../utils/config'

// eslint-disable-next-line
const api = config.get('api')

export default ({ user, close }) => {
    const [action, { loading }] = useMutation(EDIT_USER)

    const [avatar, setAvatar] = useState('')
    const [role, setRole] = useState({
        value: user.role.id, label: user.role.name
    })

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            name: form.name,
            phone: form.phone,
            email: form.email
        }

        if (role) variables.role = role.value
        if (avatar) variables.avatar = avatar.id

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.email || errors.username) && <Alert type="error" message={
                (errors.email.message) || (errors.username.message)
            } />}

            <Input options={{
                ref: register(),
                type: 'text',
                name: 'name',
                defaultValue: user.name || '',
                disabled: loading,
                placeholder: 'Enter name'
            }} />

            <Input options={{
                ref: register(),
                type: 'text',
                name: 'phone',
                defaultValue: user.phone || '',
                disabled: loading,
                placeholder: 'Enter phone'
            }} />

            <Input options={{
                ref: register(),
                type: 'text',
                name: 'email',
                defaultValue: user.email || '',
                disabled: loading,
                placeholder: 'Enter email'
            }} />

            <Query query={GET_ALL_ROLES} pseudo={{ count: 1, height: 45 }}>
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
            </Query>

            <Query query={GET_ALL_AVATARS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <List options={{
                        type: 'grid',
                        state: avatar,
                        list: data.allAvatars,
                        handlerItem: setAvatar
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
                <p>Save</p>
            </Button>
        </form>
    )
}