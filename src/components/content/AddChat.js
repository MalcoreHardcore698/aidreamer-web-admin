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

export default ({ close }) => {
    const [action, { loading }] = useMutation(ADD_CHAT)

    const[chatType, setChatType] = useState('USER_CHAT')
    const[sender, setSender] = useState(null)
    const[reciever, setReciever] = useState(null)
    const[members, setMembers] = useState(null)

    const { handleSubmit, register } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            type: chatType,
            title: form.title,
            members: (chatType.includes('USER'))
                ? [sender.value, reciever.value]
                : members.map(member => member.value)
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
                disabled: loading,
                placeholder: 'Enter title'
            }} />

            <Query query={GET_ALL_CHAT_TYPES} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <Toggler options={{
                        type: 'auto',
                        state: chatType,
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
                                defaultValue: sender,
                                placeholder: 'Choose sender',
                                options: data.allUsers.map(sender => ({
                                    value: sender.name, label: sender.name
                                })),
                                onChange: (e) => {
                                    setSender(e)
                                }
                            }} />
                            <Select options={{
                                defaultValue: reciever,
                                placeholder: 'Choose reciever',
                                options: data.allUsers.map(reciever => ({
                                    value: reciever.name, label: reciever.name
                                })),
                                onChange: (e) => {
                                    setReciever(e)
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
                <p>Add</p>
            </Button>
        </form>
    )
}