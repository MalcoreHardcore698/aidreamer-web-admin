import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import Table from './ui/Table'
import Container from './ui/Container'
import Row from './ui/Row'
import Button from './ui/Button'
import Message from './ui/Message'
import Headline from './ui/Headline'
import { setDocuments } from '../utils/actions'
import users from '../stores/users'
import './styles/Table.css'

const AddEntry = ({ query, variables }) => {
    return (
        <Container>
            <Message text="No Content" padding />
        </Container>
    )
}

const EditEntry = ({ entry, query, variables }) => {
    return (
        <Container>
            <Message text="No Content" padding />
        </Container>
    )
}

const DeleteEntry = ({ entry, query, variables, close }) => {
    const state = useSelector(state => state)

    return (
        <Container>
            <Message text={`Will be delete ${state.documents.length} documents`} padding />
            <Row type="flex">
                <Button options={{
                    state: 'inactive',
                    classNames: 'grow',
                    handler: close
                }}>
                    <p>No</p>
                </Button>
                <Button options={{
                    state: 'inactive',
                    classNames: 'grow',
                    handler: close
                }}>
                    <p>Yes</p>
                </Button>
            </Row>
        </Container>
    )
}

export default ({ showModal }) => {
    const dispatch = useDispatch()
    
    return (
        <main className="home">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Gallery</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Table options={{
                    data: users.map(user => ([
                        { header: 'ID', value: user.id, type: 'text', visible: false },
                        { header: 'Аватар', value: user.avatar.path, type: 'img', visible: false },
                        { header: 'Имя', value: user.name, type: 'text' },
                        { header: 'Пароль', value: user.password, type: 'text' },
                        { header: 'Email', value: user.email, type: 'text' },
                        { header: 'Телефон', value: user.phone, type: 'text' },
                        { header: 'Роль', value: user.role, type: 'text' },
                        { header: 'Баланс', value: user.balance, type: 'text' },
                        { header: 'Дата последнего входа', value: user.dateLastAuth, type: 'text', visible: false },
                        { header: 'Дата регистрации', value: user.dateRegistration, type: 'twxt', visible: false },
                        { header: 'Подтвержден Email', value: user.isVerifiedEmail, type: 'text', visible: false },
                        { header: 'Подтвержден телефон', value: user.isVerifiedPhone, type: 'text', visible: false },
                        { header: 'Включены уведомления', value: user.isNotified, type: 'text', visible: false }
                    ])),
                    actions: [
                        ({ table, dishands }) => (
                            <Button options={{
                                type: 'icon',
                                state: (dishands) ? 'disable' : 'active',
                                disabled: dishands,
                                classNames: 'stretch',
                                handler: () => {
                                    dispatch(setDocuments(table.filter(t => t.checked)))
                                    showModal([
                                        {
                                            path: '/',
                                            title: 'Are you sure you want to delete this document?',
                                            component: ({ close }) => <DeleteEntry close={close} />
                                        }
                                    ])
                                }
                            }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        ),
                        ({ dishands }) => (
                            <Button options={{
                                type: 'icon',
                                state: (dishands) ? 'disable' : 'active',
                                disabled: dishands,
                                classNames: 'stretch',
                                handler: () => showModal([
                                    {
                                        path: '/',
                                        title: 'Edit Entry',
                                        component: () => <EditEntry />
                                    }
                                ])
                            }}>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                        ),
                        () => (
                            <Button options={{
                                type: 'icon',
                                state: 'active',
                                classNames: 'stretch',
                                handler: () => showModal([
                                    {
                                        path: '/',
                                        title: 'Add Entry',
                                        component: () => <AddEntry />
                                    }
                                ])
                            }}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        )
                    ]
                }} />
            </aside>
        </main>
    )
}