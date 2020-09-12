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

import EditRole from './content/EditRole'
import AddRole from './content/AddRole'
import DeleteEntries from './content/DeleteEntries'

import {
    GET_ALL_ROLES,
    DELETE_ROLES,
    SUB_ALL_ROLES
} from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Roles</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_ROLES}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_ROLES} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.roles) || data.allRoles),
                                    dataTable: ((subData && subData.roles) || data.allRoles).map(role => ([
                                        { header: 'ID', value: role.id, type: 'text', visible: false },
                                        { header: 'Имя', value: role.name, type: 'text' },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(role.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
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
                                                            title: 'Delete Role?',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_ROLES}
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
                                            const role = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!role)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!role),
                                                    classNames: 'stretch',
                                                    handler: () => (role) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Role',
                                                        component: ({ close }) => <EditRole
                                                            role={role}
                                                            close={close}
                                                        />
                                                    }], true)
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
                                                        title: 'Add Role',
                                                        component: ({ close }) => <AddRole
                                                            close={close}
                                                        />
                                                    }
                                                ], true)
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