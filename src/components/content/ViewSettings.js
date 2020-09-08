import React, { useState, useContext } from 'react'
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
import Button from './../ui/Button'
import List from './../ui/List'
import Input from './../ui/Input'
import TextArea from './../ui/TextArea'
import Divider from './../ui/Divider'

import { setUser } from '../../utils/actions'

import EnglishFlagIcon from '../../assets/icons/united-kingdom.svg'
import RussianFlagIcon from '../../assets/icons/russia.svg'
import BelarusFlagIcon from '../../assets/icons/belarus.svg'

export const SettingsEditProfileContent = ({ jump }) => {
    const state = useSelector(state => state)
    const [disabled, setDisabled] = useState(true)

    const user = state.user

    return (
        <Container>
            <Input options={{
                type: 'text',
                name: 'name',
                value: user.name,
                onChange: () => {
                    setDisabled(false)
                }
            }} />
            <Button options={{
                state: 'inactive',
                classNames: 'grow',
                disabled, handler: () => {
                    jump('/privacy-and-security')
                }
            }}>
                <p>Save Changes</p>
            </Button>
        </Container>
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
                        <p className="avatar">
                            <img src={item.icon} alt="User" />
                        </p>
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