import React, { useState, useEffect } from 'react'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Form from '../ui/Form'
import Input from '../ui/Input'
import Toggler from '../ui/Toggler'
import Select from '../ui/Select'
import { GET_ALL_CHAT_TYPES, GET_ALL_USERS, ADD_CHAT, EDIT_CHAT  } from '../../utils/queries'

export default ({
    document,
    close,
    add=false,
    edit=false
}) => {
    const [variables, setVariables] = useState({})

    const[chatType, setChatType] = useState(document?.type || 'USER_CHAT')
    const[sender, setSender] = useState((document?.type === 'USER_CHAT') ? ({
        value: document.members[0].name, label: document.members[0].name
    }) : null)
    const[reciever, setReciever] = useState((document?.type === 'USER_CHAT') ? ({
        value: document.members[1].name, label: document.members[1].name
    }) : null)
    const[members, setMembers] = useState((document?.members) ? document.members.map(member => ({
        value: member.name, label: member.name
    })) : null)

    const variablesCompose = (form, options) => {
        return {
            ...options,
            ...variables,
            title: form.title
        }
    }

    useEffect(() => {
        const options = {
            members: (chatType.includes('USER'))
                ? [sender.value, reciever.value]
                : members.map(member => member.value),
            type: chatType
        }
        if (edit) options.id = document._id
        setVariables((vars) => ({
            ...vars,
            ...options
        }))
    }, [members, chatType, sender, reciever, edit, document])

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? ADD_CHAT : EDIT_CHAT}
            variables={variables}
            beforeEffect={(form, options) => variablesCompose(form, options)}
            afterEffect={close}
        >
            {({ elevate, register, loading }) => (
                <React.Fragment>
                    <Input options={{
                        ref: register({ required: true }),
                        type: 'text',
                        name: 'title',
                        defaultValue: document.title || '',
                        placeholder: 'Enter title',
                        disabled: loading
                    }} />

                    <Query query={GET_ALL_CHAT_TYPES} pseudo={{ count: 1, height: 45 }}>
                        {({ data }) => (
                            <Toggler options={{
                                type: 'auto',
                                state: document.type || chatType,
                                handler: (item) => {
                                    setChatType(item)
                                    elevate()
                                },
                                targets: (data && data.allChatTypes).map((type, key) => ({
                                    type: type,
                                    value: (
                                        <Row key={key}>
                                            <p>{type.replace('_', ' ')}</p>
                                        </Row>
                                    )
                                }))}}
                            />
                        )}
                    </Query>

                    <Query query={GET_ALL_USERS} pseudo={{ count: 1, height: 45 }}>
                        {({ data }) => (
                            (chatType.includes('USER')) ? (
                                <React.Fragment>
                                    <Select options={{
                                        defaultValue: sender,
                                        placeholder: 'Choose sender',
                                        options: data.allUsers.map(_sender => ({
                                            value: _sender.name, label: _sender.name
                                        })),
                                        onChange: (e) => {
                                            setSender(e)
                                            elevate()
                                        }
                                    }} />
                                    <Select options={{
                                        defaultValue: reciever,
                                        placeholder: 'Choose reciever',
                                        options: data.allUsers.map(_reciever => ({
                                            value: _reciever.name, label: _reciever.name
                                        })),
                                        onChange: (e) => {
                                            setReciever(e)
                                            elevate()
                                        }
                                    }} />
                                </React.Fragment>
                            ) : (
                                <Select options={{
                                    value: members,
                                    placeholder: 'Choose members',
                                    options: data.allUsers.map(member => ({
                                        value: member.name,
                                        label: member.name
                                    })),
                                    closeMenuOnSelect: false,
                                    isMulti: true,
                                    onChange: (e) => {
                                        setMembers(e)
                                        elevate()
                                    }
                                }} />
                            )
                        )}
                    </Query>
                </React.Fragment>
            )}
        </Form>
    )
}