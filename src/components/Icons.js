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

import AddIcon from './content/AddIcon'
import EditIcon from './content/EditIcon'
import DeleteEntries from './content/DeleteEntries'

import { GET_ALL_ICONS, SUB_ALL_ICONS, DELETE_ICONS } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Icons</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_ICONS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_ICONS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.icons) || data.allIcons),
                                    dataTable: ((subData && subData.icons) || data.allIcons).map(icon => ([
                                        { header: 'ID', value: icon.id, type: 'text', visible: false },
                                        { header: 'Изображение', value: icon.path, type: 'icon' },
                                        { header: 'Сообщество', value: icon.hub.title, type: 'text' },
                                        { header: 'Название', value: icon.name, type: 'text', visible: false },
                                        { header: 'Путь', value: icon.path, type: 'text', visible: false },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(icon.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(icon.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
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
                                                            title: 'Delete Icon',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_ICONS}
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
                                            const icon = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!icon)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!icon),
                                                    classNames: 'stretch',
                                                    handler: () => (icon) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Icon',
                                                        component: ({ close }) => <EditIcon
                                                            icon={icon}
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
                                                        title: 'Add Icon',
                                                        component: ({ close }) => <AddIcon
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