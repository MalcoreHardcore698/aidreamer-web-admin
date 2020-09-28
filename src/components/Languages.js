import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'
import Subscription from './ui/Subscription'
import Query from './ui/Query'
import Table from './ui/Table'
import Row from './ui/Row'
import Button from './ui/Button'
import Headline from './ui/Headline'
import FormLanguage from './forms/Language'
import DeleteEntries from './forms/Delete'
import { GET_ALL_LANGUAGES, SUB_ALL_LANGUAGES, DELETE_LANGUAGES } from '../utils/queries'
import './styles/Table.css'

export default ({ showModal }) => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Language</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_LANGUAGES}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_LANGUAGES} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.languages) || data.allLanguages),
                                    dataTable: ((subData && subData.languages) || data.allLanguages).map(language => ([
                                        { header: 'ID', value: language.id, type: 'text', visible: false },
                                        { header: 'Иконка', value: language?.flag?.path || null, type: 'icon' },
                                        { header: 'Код', value: language.code, type: 'text' },
                                        { header: 'Название', value: language.title, type: 'text' },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(language.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(language.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
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
                                                            title: 'Delete Language',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_LANGUAGES}
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
                                            const language = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!language)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!language),
                                                    classNames: 'stretch',
                                                    handler: () => (language) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Language',
                                                        component: ({ close }) => <FormLanguage
                                                            edit
                                                            document={language}
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
                                                        title: 'Add Language',
                                                        component: ({ close }) => <FormLanguage
                                                            add
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