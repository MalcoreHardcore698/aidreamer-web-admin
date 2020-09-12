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

import AddHub from './content/AddHub'
import EditHub from './content/EditHub'
import DeleteEntries from './content/DeleteEntries'

import { GET_ALL_HUBS, SUB_ALL_HUBS, DELETE_HUBS } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Hubs</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_HUBS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_HUBS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.hubs) || data.allHubs),
                                    dataTable: ((subData && subData.hubs) || data.allHubs).map(hub => ([
                                        { header: 'ID', value: hub.id, type: 'text', visible: false },
                                        { header: 'Иконка', value: hub.icon.path, type: 'icon' },
                                        { header: 'Заголовок', value: hub.title, type: 'text' },
                                        { header: 'Описание', value: hub.description, type: 'text' },
                                        { header: 'Слоган', value: hub.slogan, type: 'text', visible: false },
                                        { header: 'Цвет', value: hub.color, type: 'color' },
                                        { header: 'Пользователи', value: hub.countUsers, type: 'text', visible: false },
                                        { header: 'Статус', value: hub.status, type: 'text' },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(hub.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(hub.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
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
                                                                query={DELETE_HUBS}
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
                                            const hub = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!hub)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!hub),
                                                    classNames: 'stretch',
                                                    handler: () => (hub) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Hub',
                                                        component: ({ close }) => <EditHub
                                                            status
                                                            hub={hub}
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
                                                        title: 'Add Hub',
                                                        component: ({ close }) => <AddHub
                                                            status
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