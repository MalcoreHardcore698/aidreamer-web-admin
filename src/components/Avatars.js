import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import Moment from 'react-moment'

import Query from './ui/Query'
import Subscription from './ui/Subscription'
import Table from './ui/Table'
import Row from './ui/Row'
import Button from './ui/Button'
import Headline from './ui/Headline'

import AddAvatar from './content/AddAvatar'
import EditAvatar from './content/EditAvatar'
import DeleteEntries from './content/DeleteEntries'

import { setDocuments } from '../utils/actions'
import { GET_ALL_AVATARS, SUB_ALL_AVATARS, DELETE_ICONS } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    const dispatch = useDispatch()
    
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Avatars</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_AVATARS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_AVATARS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.avatars) || data.allAvatars),
                                    dataTable: ((subData && subData.avatars) || data.allAvatars).map(avatar => ([
                                        { header: 'ID', value: avatar.id, type: 'text', visible: false },
                                        { header: 'Изображение', value: avatar.path, type: 'img' },
                                        { header: 'Порядок', value: avatar.order, type: 'text' },
                                        { header: 'Название', value: avatar.name, type: 'text', visible: false },
                                        { header: 'Путь', value: avatar.path, type: 'text', visible: false },
                                        { header: 'Редкость', value: avatar.complexity, type: 'text' },
                                        { header: 'Сообщество', value: avatar.hub.name, type: 'text' },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(avatar.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(avatar.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
                                    ])),
                                    actions: [
                                        ({ table, dishands }) => (
                                            <Button options={{
                                                state: (dishands) ? 'disable icon inactive' : 'active icon',
                                                disabled: dishands,
                                                classNames: 'stretch',
                                                handler: () => {
                                                    dispatch(setDocuments(table.filter(t => t.checked)))
                                                    showModal([
                                                        {
                                                            path: '/',
                                                            title: 'Delete Avatar',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_ICONS}
                                                                handler={async (action, entry, docs) => {
                                                                    await action({
                                                                        variables: {
                                                                            id: (entry)
                                                                                ? [{
                                                                                    id: entry.id,
                                                                                    user: entry.user.id
                                                                                }]
                                                                                : docs.map(doc => ({
                                                                                    id: doc.id,
                                                                                    user: doc.user.id
                                                                                }))
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
                                                        title: 'Edit Avatar',
                                                        component: ({ close }) => <EditAvatar
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
                                                        title: 'Add Avatar',
                                                        component: ({ close }) => <AddAvatar
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