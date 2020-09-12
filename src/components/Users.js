import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'

import Query from './ui/Query'
import Subscription from './ui/Subscription'
import Table from './ui/Table'
import Row from './ui/Row'
import Button from './ui/Button'
import Headline from './ui/Headline'

import AddUser from './content/AddUser'
import EditUser from './content/EditUser'
import DeleteEntries from './content/DeleteEntries'

import { GET_ALL_USERS, SUB_ALL_USERS, DELETE_USERS } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    return (
        <main className="dashboard">
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
                                        { header: 'Аватар', value: user.avatar.path, type: 'icon' },
                                        { header: 'Имя', value: user.name, type: 'text' },
                                        { header: 'Email', value: user.email, type: 'text' },
                                        { header: 'Роль', value: user.role.name, type: 'text' },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(user.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(user.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
                                    ])),
                                    actions: [
                                        ({ table, dishands }) => (
                                            <Button options={{
                                                state: (dishands) ? 'disable icon inactive' : 'active icon',
                                                disabled: dishands,
                                                classNames: 'stretch',
                                                handler: () => {
                                                    showModal([
                                                        {
                                                            path: '/',
                                                            title: 'Delete Article?',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_USERS}
                                                                entries={table.filter(t => t.checked)}
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
                                                    ], true)
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
                                                    state: (dishands || (!user)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!user),
                                                    classNames: 'stretch',
                                                    handler: () => (user) && showModal([{
                                                        path: '/',
                                                        title: 'Edit User',
                                                        component: ({ close }) => <EditUser
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
                                                state: 'active icon',
                                                classNames: 'stretch',
                                                handler: () => showModal([
                                                    {
                                                        path: '/',
                                                        title: 'Add User',
                                                        component: ({ close }) => <AddUser
                                                            user
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