import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Alert from '../ui/Alert'
import List from '../ui/List'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Checkbox from '../ui/Checkbox'
import Message from '../ui/Message'
import { EDIT_USER, GET_ALL_HUBS, GET_ALL_ROLES } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ user, close }) => {
    const [action, { loading }] = useMutation(EDIT_USER)

    const [preferences, setPreferences] = useState([])
    const [avatar, setAvatar] = useState(user.avatar)
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
        if (preferences) variables.preferences = preferences

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.email || errors.username) && <Alert type="error" message={
                (errors.email.message) || (errors.username.message)
            } />}

            <p className="ui-title">General</p>
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

            <p className="ui-title">Avatar</p>
            {(user.availableAvatars && (user.availableAvatars.length > 0)) ? <List options={{
                type: 'grid',
                state: avatar,
                list: user.availableAvatars,
                handlerItem: setAvatar
            }}>
                {({ item }) => (
                    <img
                        className="image"
                        src={(item.path).replace('./', `${api}/`)}
                        alt="Hub"
                    />
                )}
            </List> : <Message text="No Available Avatars" padding />}

            <p className="ui-title">Preferences</p>
            <Query query={GET_ALL_HUBS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <Checkbox options={{
                        type: 'grid',
                        state: preferences,
                        list: data.allHubs,
                        handler: (items) => {
                            setPreferences(items)
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