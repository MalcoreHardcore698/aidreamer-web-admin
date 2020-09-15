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

import AddFlag from './content/AddFlag'
import EditFlag from './content/EditFlag'
import DeleteEntries from './content/DeleteEntries'

import { GET_ALL_FLAGS, SUB_ALL_FLAGS, DELETE_FLAGS } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Flags</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_FLAGS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_FLAGS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.flags) || data.allFlags),
                                    dataTable: ((subData && subData.flags) || data.allFlags).map(flag => ([
                                        { header: 'ID', value: flag.id, type: 'text', visible: false },
                                        { header: 'Изображение', value: flag.path, type: 'icon' },
                                        { header: 'Название', value: flag.name, type: 'text', visible: false },
                                        { header: 'Путь', value: flag.path, type: 'text', visible: false },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(flag.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(flag.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
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
                                                            title: 'Delete Flag',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_FLAGS}
                                                                entries={table.filter(t => t.checked)}
                                                                handler={async (action, entry, entries) => {
                                                                    await action({
                                                                        variables: {
                                                                            id: (entry)
                                                                                ? [{
                                                                                    id: entry.id,
                                                                                    user: entry.user.id
                                                                                }]
                                                                                : entries.map(ent => ent._id)
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
                                            const flag = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!flag)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!flag),
                                                    classNames: 'stretch',
                                                    handler: () => (flag) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Flag',
                                                        component: ({ close }) => <EditFlag
                                                            flag={flag}
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
                                                state: 'icon active',
                                                classNames: 'stretch',
                                                handler: () => showModal([
                                                    {
                                                        path: '/',
                                                        title: 'Add Flag',
                                                        component: ({ close }) => <AddFlag
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