import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faLock,
    faFlag,
    faQuestion
} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../AuthContext'
import Container from './../ui/Container'
import Row from './../ui/Row'
import Alert from './../ui/Alert'
import Query from './../ui/Query'
import Avatar from './../ui/Avatar'
import Button from './../ui/Button'
import List from './../ui/List'
import Checkbox from './../ui/Checkbox'
import Input from './../ui/Input'
import TextArea from './../ui/TextArea'
import Divider from './../ui/Divider'
import { setUser } from '../../utils/actions'
import EnglishFlagIcon from '../../assets/icons/united-kingdom.svg'
import RussianFlagIcon from '../../assets/icons/russia.svg'
import BelarusFlagIcon from '../../assets/icons/belarus.svg'
import { EDIT_USER, GET_ALL_HUBS, GET_ALL_AVATARS } from '../../utils/queries'

import { config } from '../../utils/config'

const api = config.get('api')

export const SettingsEditProfileContent = ({ jump }) => {
    const [action, { loading }] = useMutation(EDIT_USER)
    const state = useSelector(state => state)

    const [disabled, setDisabled] = useState(true)
    const [avatar, setAvatar] = useState('')
    const [hubs, setHubs] = useState(state.user.preferences)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            name: state.user.name,
            phone: form.phone
        }

        if (avatar) variables.avatar = avatar.id

        await action({ variables })

        jump('/')
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.avatar || errors.name) && <Alert type="error" message={
                (errors.avatar.message) || (errors.name.message)
            } />}

            <p className="ui-title">General</p>
            <Input options={{
                type: 'text',
                name: 'name',
                defaultValue: state.user.name || '',
                disabled: true,
                placeholder: 'Enter name'
            }} />

            <Input options={{
                ref: register(),
                type: 'number',
                name: 'phone',
                defaultValue: state.user.phone || '',
                disabled: loading,
                placeholder: 'Enter phone'
            }} />

            <p className="ui-title">Avatar</p>
            <Query query={GET_ALL_AVATARS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <List options={{
                        type: 'grid',
                        state: avatar || state.user.avatar,
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

            <p className="ui-title">Preferences</p>
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
                type: 'submit',
                state: 'inactive',
                classNames: 'grow',
                disabled: (disabled) || (loading)
            }}>
                <p>Save</p>
            </Button>
        </form>
    )
}

export const SettingsHomeContent = ({ jump, close }) => {
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()

    return (
        <Container>
            <Button options={{
                state: 'inactive',
                classNames: 'grow',
                handler: () => jump('/edit')
            }}>
                <FontAwesomeIcon icon={faPen} />
                <p>Edit profile</p>
            </Button>
            <Button options={{
                state: 'inactive',
                classNames: 'grow',
                handler: () => jump('/privacy-and-security')
            }}>
                <FontAwesomeIcon icon={faLock} />
                <p>Privacy and Security</p>
            </Button>

            <Divider />
            
            <Row type="col2">
                <Button options={{
                    state: 'inactive',
                    classNames: 'grow',
                    handler: () => jump('/language')
                }}>
                    <FontAwesomeIcon icon={faFlag} />
                    <p>Language</p>
                </Button>
                <Button options={{
                    state: 'inactive',
                    classNames: 'grow',
                    handler: () => jump('/ask-a-question')
                }}>
                    <FontAwesomeIcon icon={faQuestion} />
                    <p>Ask a question</p>
                </Button>
            </Row>

            <Divider />
            
            <Button options={{
                state: 'active clear',
                classNames: 'grow',
                handler: () => {
                    close()
                    dispatch(setUser(null))
                    auth.logout()
                }
            }}>
                <p>Log Out</p>
            </Button>
        </Container>
    )
}

export const SettingsQuestionContent = ({ back }) => {
    const [disabled, setDisabled] = useState(true)

    return (
        <Container>
            <Input options={{
                type: 'text',
                name: 'title',
                placeholder: 'Enter topic question',
                onChange: () => {
                    setDisabled(false)
                }
            }} />
            <TextArea options={{
                name: 'body',
                placeholder: 'Enter content question',
                onChange: () => {
                    setDisabled(false)
                }
            }} />
            <Button options={{
                state: 'inactive',
                classNames: 'grow',
                disabled, handler: () => {
                    back()
                }
            }}>
                <p>Submit</p>
            </Button>
        </Container>
    )
}

export const SettingsLanguageContent = ({ back }) => {
    const langs = [
        { id: 0, icon: EnglishFlagIcon, label: 'English' },
        { id: 1, icon: RussianFlagIcon, label: 'Русский' },
        { id: 2, icon: BelarusFlagIcon, label: 'Белоруская' }
    ]
    const [checked, setChecked] = useState(langs[0])
    const [disabled, setDisabled] = useState(true)

    return (
        <Container>
            <Divider />

            <List options={{
                list: langs,
                state: checked,
                handlerItem: (item) => {
                    setChecked(item)
                    setDisabled(false)
                }
            }}>
                {({ item }) => (
                    <React.Fragment>
                        <Avatar avatar={{ path: item.icon }} />
                        <p className="name">{item.label}</p>
                    </React.Fragment>
                )}
            </List>

            <Button options={{
                state: 'inactive',
                classNames: 'grow',
                disabled, handler: () => {
                    back()
                }
            }}>
                <p>Apply</p>
            </Button>
        </Container>
    )
}