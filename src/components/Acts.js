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
import FormAct from './forms/Act'
import DeleteEntries from './forms/Delete'
import {
    GET_ALL_ACTS,
    DELETE_ACTS,
    SUB_ALL_ACTS
} from '../utils/queries'
import './styles/Table.css'

export default ({ showModal }) => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Acts</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_ACTS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_ACTS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.acts) || data.allActs),
                                    dataTable: ((subData && subData.acts) || data.allActs).map(act => ([
                                        { header: 'ID', value: act.id, type: 'text', visible: false },
                                        { header: 'Название', value: act.title, type: 'text' },
                                        { header: 'Описание', value: act.description, type: 'text' },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(act.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
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
                                                            title: 'Delete Act?',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_ACTS}
                                                                entries={table.filter(t => t.checked)}
                                                                handler={async (action, entry, docs) => {
                                                                    await action({
                                                                        variables: {
                                                                            id: (entry)
                                                                                ? [entry.id]
                                                                                : docs.map(doc => doc._id)
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
                                            const act = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!act)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!act),
                                                    classNames: 'stretch',
                                                    handler: () => (act) && showModal([{
                                                        path: '/',
                                                        title: 'Edit',
                                                        component: ({ close }) => <FormAct
                                                            add
                                                            document={act}
                                                            close={close}
                                                            isStatus
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
                                                        title: 'Add',
                                                        component: ({ close }) => <FormAct
                                                            add
                                                            close={close}
                                                            isStatus
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