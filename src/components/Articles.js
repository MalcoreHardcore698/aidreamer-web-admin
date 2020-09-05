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

import AddArticle from './content/AddArticle'
import EditArticle from './content/EditArticle'
import DeleteEntries from './content/DeleteEntries'

import { setDocuments } from '../utils/actions'
import { GET_ALL_ARTICLES, SUB_ARTICLES, DELETE_ARTICLES } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    const dispatch = useDispatch()
    
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Articles</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_ARTICLES}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ARTICLES} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.articles) || data.allArticles),
                                    dataTable: ((subData && subData.articles) || data.allArticles).map(article => ([
                                        { header: 'ID', value: article.id, type: 'text', visible: false },
                                        { header: 'Заголовок', value: article.title, type: 'text' },
                                        { header: 'Описание', value: article.description, type: 'text' },
                                        { header: 'Содержание', value: article.body, type: 'text', visible: false },
                                        { header: 'Изображение', value: article.image.path, type: 'img' },
                                        { header: 'Сообщество', value: article.hub.title, type: 'text' },
                                        { header: 'Статус', value: article.status, type: 'text' },
                                        { header: 'Дата редактирования', value: article.updatedAt, type: 'text', visible: false },
                                        { header: 'Дата создания', value: article.createdAt, type: 'text' }
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
                                                            title: 'Delete Article?',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_ARTICLES}
                                                                handler={async (action, entry, docs) => {
                                                                    await action({
                                                                        variables: {
                                                                            articles: (entry)
                                                                                ? [{
                                                                                    id: entry.id,
                                                                                    author: entry.author.id
                                                                                }]
                                                                                : docs.map(doc => ({
                                                                                    id: doc.id,
                                                                                    author: doc.author.id
                                                                                }))
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
                                            const article = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!article)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!article),
                                                    classNames: 'stretch',
                                                    handler: () => (article) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Article',
                                                        component: ({ close }) => <EditArticle
                                                            status
                                                            article={article}
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
                                                state: 'icon active',
                                                classNames: 'stretch',
                                                handler: () => showModal([
                                                    {
                                                        path: '/',
                                                        title: 'Add Article',
                                                        component: ({ close }) => <AddArticle
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