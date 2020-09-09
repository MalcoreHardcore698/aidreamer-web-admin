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

import AddChat from './content/AddChat'
import EditChat from './content/EditChat'
import DeleteEntries from './content/DeleteEntries'

import { setDocuments } from '../utils/actions'
import { GET_ALL_CHATS, SUB_ALL_CHATS, DELETE_CHATS } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    const dispatch = useDispatch()
    
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Chats</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_CHATS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_CHATS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.chats) || data.allChats),
                                    dataTable: ((subData && subData.chats) || data.allChats || []).map(chat => ([
                                        { header: 'ID', value: chat.id, type: 'text', visible: false },
                                        { header: 'Название', value: chat.title, type: 'text' },
                                        { header: 'Участники', value: chat.members?.length, type: 'text' },
                                        { header: 'Сообщений', value: chat.messages?.length, type: 'text' },
                                        { header: 'Тип чата', value: chat.type, type: 'text' },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(chat.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(chat.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
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
                                                            title: 'Delete Chat',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_CHATS}
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
                                            const chat = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!chat)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!chat),
                                                    classNames: 'stretch',
                                                    handler: () => (chat) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Chat',
                                                        component: ({ close }) => <EditChat
                                                            chat={chat}
                                                            members={chat.members}
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
                                                        title: 'Add Chat',
                                                        component: ({ close }) => <AddChat
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