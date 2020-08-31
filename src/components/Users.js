import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'

import Query from './ui/Query'
import Subscription from './ui/Subscription'
import Table from './ui/Table'
import Row from './ui/Row'
import Button from './ui/Button'
import Headline from './ui/Headline'

import AddUser from './content/AddUser'
import EditUser from './content/EditUser'
import DeleteEntries from './content/DeleteEntries'

import { setDocuments } from '../utils/actions'
import { GET_ALL_USERS, SUB_ALL_USERS, DELETE_USERS } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    const dispatch = useDispatch()
    
    return (
        <main className="home">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Users</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_USERS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_USERS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.users) || data.allUsers),
                                    dataTable: ((subData && subData.users) || data.allUsers).map(user => ([
                                        { header: 'ID', value: user.id, type: 'text', visible: false },
                                        { header: 'Аватар', value: user.avatar.path, type: 'img', visible: false },
                                        { header: 'Имя', value: user.name, type: 'text' },
                                        { header: 'Email', value: user.email, type: 'text' },
                                        { header: 'Роль', value: user.role, type: 'text' },
                                        { header: 'Баланс', value: user.balance, type: 'text', visible: false },
                                        { header: 'Дата последнего входа', value: user.updatedAt, type: 'text', visible: false },
                                        { header: 'Дата регистрации', value: user.createdAt, type: 'text' },
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
                                                            title: 'Delete Article?',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_USERS}
                                                                handler={async (action, entry, docs) => {
                                                                    await action({
                                                                        variables: {
                                                                            id: (entry)
                                                                                ? [entry.id]
                                                                                : docs.map(doc => doc.id)
                                                                        }
                                                                    })
                                                                }}
                                                                close={close}
                                                            />
                                                        }
                                                    ])
                                                }
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        ),
                                        ({ table, dishands }) => {
                                            const docs = table.filter(t => t.checked)
                                            const user = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    type: 'icon',
                                                    state: (dishands || (!user)) ? 'disable' : 'active',
                                                    disabled: dishands || (!user),
                                                    classNames: 'stretch',
                                                    handler: () => (user) && showModal([{
                                                        path: '/',
                                                        title: 'Edit User',
                                                        component: ({ close }) => <EditUser
                                                            status
                                                            user={user}
                                                            close={close}
                                                        />
                                                    }])
                                                }}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                            )
                                        },
                                        () => (
                                            <Button options={{
                                                type: 'icon',
                                                state: 'active',
                                                classNames: 'stretch',
                                                handler: () => showModal([
                                                    {
                                                        path: '/',
                                                        title: 'Add User',
                                                        component: ({ close }) => <AddUser
                                                            status
                                                            close={close}
                                                        />
                                                    }
                                                ])
                                            }}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        )
                                    ]
                                }} />
                            )}
                        </Subscription>
                    )}
                </Query>
            </aside>
        </main>
    )
}