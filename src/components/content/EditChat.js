import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Toggler from '../ui/Toggler'
import Select from '../ui/Select'
import { ADD_CHAT, GET_ALL_CHAT_TYPES, GET_ALL_USERS } from '../../utils/queries'

export default ({ chat, members, close }) => {
    const [action, { loading }] = useMutation(ADD_CHAT)

    const[chatType, setChatType] = useState(chat.type || 'USER_CHAT')
    const[_sender, _setSender] = useState((chat.type === 'USER_CHAT') ? ({
        value: chat.members[0].name, label: chat.members[0].name
    }) : null)
    const[_reciever, _setReciever] = useState((chat.type === 'USER_CHAT') ? ({
        value: chat.members[1].name, label: chat.members[1].name
    }) : null)
    const[_members, _setMembers] = useState((members) ? members.map(member => ({
        value: member.name, label: member.name
    })) : null)

    const { handleSubmit, register } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            type: chatType,
            title: form.title,
            members: members.map(member => member.value)
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'title',
                defaultValue: chat.title || '',
                disabled: loading,
                placeholder: 'Enter title'
            }} />

            <Query query={GET_ALL_CHAT_TYPES} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <Toggler options={{
                        type: 'auto',
                        state: chat.type || chatType,
                        handler: setChatType,
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
                                defaultValue: _sender,
                                placeholder: 'Choose sender',
                                options: data.allUsers.map(sender => ({
                                    value: sender.name, label: sender.name
                                })),
                                onChange: (e) => {
                                    _setSender(e)
                                }
                            }} />
                            <Select options={{
                                defaultValue: _reciever,
                                placeholder: 'Choose reciever',
                                options: data.allUsers.map(reciever => ({
                                    value: reciever.name, label: reciever.name
                                })),
                                onChange: (e) => {
                                    _setReciever(e)
                                }
                            }} />
                        </React.Fragment>
                    ) : (
                        <Select options={{
                            value: _members,
                            placeholder: 'Choose members',
                            options: data.allUsers.map(member => ({
                                value: member.name,
                                label: member.name
                            })),
                            closeMenuOnSelect: false,
                            isMulti: true,
                            onChange: (e) => {
                                _setMembers(e)
                            }
                        }} />
                    )
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