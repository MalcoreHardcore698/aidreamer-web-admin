import React, { useState, useEffect } from 'react'
import Query from '../ui/Query'
import Form from '../ui/Form'
import List from '../ui/List'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Checkbox from '../ui/Checkbox'
import Message from '../ui/Message'
import { GET_ALL_HUBS, GET_ALL_ROLES, REGISTER, EDIT_USER } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({
    document,
    close,
    add=false,
    edit=false
}) => {
    const [variables, setVariables] = useState({})

    const [preferences, setPreferences] = useState(document?.preferences)
    const [avatar, setAvatar] = useState(document?.avatar)
    const [role, setRole] = useState((document) ? {
        value: document.role.id,
        label: document.role.name
    } : null)

    const variablesCompose = (form, options) => {
        return {
            ...options,
            name: form.name,
            phone: form.phone,
            email: form.email
        }
    }

    useEffect(() => {
        const options = {
            role: role?.value,
            avatar: avatar?.id,
            preferences: preferences?.map(p => p.id)
        }
        if (edit) options.id = document._id
        setVariables((vars) => ({
            ...vars,
            ...options
        }))
    }, [role, avatar, preferences, edit, document])

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? REGISTER : EDIT_USER}
            variables={variables}
            beforeEffect={(form, options) => variablesCompose(form, options)}
            afterEffect={close}
        >
            {({ elevate, register, loading }) => (
                <React.Fragment>
                    <p className="ui-title">General</p>
                    <Input options={{
                        ref: register(),
                        type: 'text',
                        name: 'name',
                        defaultValue: document?.name || '',
                        placeholder: 'Enter name',
                        disabled: loading
                    }} />

                    <Input options={{
                        ref: register(),
                        type: 'text',
                        name: 'phone',
                        defaultValue: document?.phone || '',
                        placeholder: 'Enter phone',
                        disabled: loading
                    }} />

                    <Input options={{
                        ref: register(),
                        type: 'text',
                        name: 'email',
                        defaultValue: document?.email || '',
                        placeholder: 'Enter email',
                        disabled: loading
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
                                    elevate()
                                }
                            }} />
                        )}
                    </Query>

                    <p className="ui-title">Avatar</p>
                    {(document?.availableAvatars && (document.availableAvatars.length > 0)) ? <List options={{
                        type: 'grid',
                        state: avatar,
                        list: document?.availableAvatars,
                        handlerItem: (file) => {
                            setAvatar(file)
                            elevate()
                        }
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
                        {({ data }) => {
                            const hubs = data.allHubs

                            if (hubs.length === 0)
                                return <Message text="No hubs found" padding />
                                
                            return (
                                <Checkbox options={{
                                    type: 'grid',
                                    state: preferences,
                                    list: data.allHubs,
                                    handler: (items) => {
                                        setPreferences(items)
                                        elevate()
                                    }
                                }} />
                            )
                        }}
                    </Query>
                </React.Fragment>
            )}
        </Form>
    )
}