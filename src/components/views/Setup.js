import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Container from '../ui/Container'
import Query from '../ui/Query'
import Message from '../ui/Message'
import Button from '../ui/Button'
import List from '../ui/List'
import Checkbox from '../ui/Checkbox'
import { EDIT_USER, GET_ALL_HUBS, GET_ALL_AVATARS } from '../../utils/queries'

import { config } from '../../utils/config'

const api = config.get('api')

export const SetupGreeting = ({ jump }) => {
    return (
        <Container className="fat">
            <Message text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum" padding />

            <Button options={{
                state: 'inactive',
                classNames: 'grow',
                handler: () => jump('/choose-avatar')
            }}>
                <p>Next</p>
            </Button>
        </Container>
    )
}

export const SetupChooseAvatar = ({ jump }) => {
    const [action, { loading }] = useMutation(EDIT_USER)
    const state = useSelector(state => state)

    const [avatar, setAvatar] = useState({})
    const [disabled, setDisabled] = useState(true)

    const { handleSubmit } = useForm()

    const onSubmit = async () => {
        if (!avatar) return null

        const variables = {
            name: state.user.name,
            avatar: avatar.id
        }

        await action({ variables })

        jump('/choose-preferences')
    }
    
    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            <Query query={GET_ALL_AVATARS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <List options={{
                        type: 'grid',
                        state: avatar,
                        list: data.allAvatars,
                        handlerItem: (item) => {
                            setAvatar(item)
                            setDisabled(false)
                        }
                    }}>
                        {({ item }) => (
                            <img
                                className="image"
                                src={(item.path).replace('./', `${api}/`)}
                                alt="Avatar"
                            />
                        )}
                    </List>
                )}
            </Query>
            
            <Button options={{
                type: 'submit',
                state: 'inactive',
                classNames: 'grow',
                disabled: (disabled) || (loading)
            }}>
                <p>Next</p>
            </Button>
        </form>
    )
}

export const SetupChoosePreferences = ({ jump }) => {
    const [hubs, setHubs] = useState([])
    const [disabled, setDisabled] = useState(true)

    return (
        <Container>
            <Message text="You must select at least 3 games" padding />
            <Query query={GET_ALL_HUBS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <Checkbox options={{
                        type: 'grid',
                        state: hubs,
                        list: data.allHubs,
                        handler: (items) => {
                            setHubs(items)
                            if (items.length > 2)
                                setDisabled(false)
                        }
                    }} />
                )}
            </Query>

            <Button options={{
                state: 'inactive',
                classNames: 'grow',
                disabled,
                handler: () => {
                    jump('/congratulations')
                }
            }}>
                <p>Next</p>
            </Button>
        </Container>
    )
}

export const SetupCongratulations = ({ close }) => {
    return (
        <Container>
            <Message text="Done! Now you start using the service" padding />

            <Button options={{
                state: 'inactive',
                classNames: 'grow',
                handler: () => {
                    close()
                }
            }}>
                <p>Go</p>
            </Button>
        </Container>
    )
}