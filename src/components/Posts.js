import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlus,
    faTrash,
    faCompass,
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'
import Query from './ui/Query'
import Row from './ui/Row'
import Column from './ui/Column'
import Container from './ui/Container'
import Subscription from './ui/Subscription'
import Headline from './ui/Headline'
import List from './ui/List'
import Button from './ui/Button'
import Table from './ui/Table'
import FormPost from './forms/Post'
import DeleteEntries from './forms/Delete'
import { GET_ALL_POSTS, SUB_ALL_POSTS, DELETE_POSTS } from '../utils/queries'
import 'moment/locale/ru'
import './styles/Table.css'

function getPostIcon(type) {
    if (type === 'ARTICLE')
        return faPencilAlt
    else
        return faCompass
}

function getChoicePost(action, data) {
    return ({
        path: '/',
        title: 'Choose your type post',
        component: ({ jump }) => (
            <Container>
                <List options={{
                    type: 'grid stretch center',
                    list: (data?.allPostTypes || []).map(postType => ({
                        id: `/${action}/${postType.toLowerCase()}`,
                        label: postType,
                        icon: getPostIcon(postType)
                    })),
                    handlerItem: (item) => {
                        jump(item.id)
                    }
                }}>
                    {({ item }) => (
                        <Container>
                            <Column>
                                <div className="icon large">
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <p className="name">{item.label}</p>
                            </Column>
                        </Container>
                    )}
                </List>
            </Container>
        ),
    })
}

// ACTION define current type of form
function getFormPost(action, postType, document=null, isActiveFields) {
    return ({
        path: `/${action}/${postType}`,
        title: `${action} ${postType}`,
        component: ({ close, back }) => <FormPost
            add={(action === 'add')}
            edit={(action === 'edit')}
            type={postType.toUpperCase()}
            document={document}
            close={close}
            back={back}
            {...isActiveFields}
        />
    })
}

function getPostRoutes(action, postType, data, document, fields) {
    const isActiveFields = {
        isTitle: true,
        isSubtitle: true,
        isDescription: true,
        isContent: true,
        isHub: true,
        isPreview: true,
        isStatus: true,
        ...fields
    }
    return [
        getChoicePost(action, data),
        getFormPost('edit', postType, document, isActiveFields),
        getFormPost('add', postType, document, isActiveFields)
    ]
}

const Delete = ({ table, dishands, showModal }) => (
    <Button options={{
        state: (dishands) ? 'disable icon inactive' : 'active icon',
        disabled: dishands,
        classNames: 'stretch',
        handler: () => {
            showModal([
                {
                    path: '/',
                    title: 'Delete Post',
                    component: ({ close }) => <DeleteEntries
                        query={DELETE_POSTS}
                        entries={table.filter(t => t.checked)}
                        handler={async (action, entry, docs) => {
                            await action({
                                variables: {
                                    posts: (entry)
                                        ? [{
                                            id: entry._id,
                                            author: entry.author.name
                                        }]
                                        : docs.map(doc => ({
                                            id: doc._id,
                                            author: doc.author.name
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
)

const Mutate = ({ add, edit, table, dishands, data, showModal }) => {
    const docs = table.filter(t => t.checked)
    const post = (docs.length === 1) ? docs[0] : false

    return (
        <Button options={{
            state: (dishands || (!post)) ? 'disable icon inactive' : 'active icon',
            disabled: dishands || (!post),
            classNames: 'stretch',
            handler: () => (post) && showModal(getPostRoutes(
                ((add && 'add') || (edit && 'edit')), post.type, data, document, {}
            ))
        }}>
            <FontAwesomeIcon icon={(add) ? faPlus : faPen} />
        </Button>
    )
}

export default ({ showModal }) => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Posts</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_POSTS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_POSTS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.posts) || data.allPosts),
                                    dataTable: ((subData && subData.posts) || data.allPosts).map(post => ([
                                        { header: 'ID', value: post.id, type: 'text', visible: false },
                                        { header: 'Изображение', value: post.preview.path, type: 'img', visible: false },
                                        { header: 'Заголовок', value: post.title, type: 'text' },
                                        { header: 'Подзаголовок', value: post.subtitle, type: 'text', visible: false },
                                        { header: 'Описание', value: post.description, type: 'text', visible: false },
                                        { header: 'Содержимое', value: post.content, type: 'text' },
                                        { header: 'Комментарии', value: post.comments.length, type: 'text' },
                                        { header: 'Сообщество', value: post.hub.title, type: 'text' },
                                        { header: 'Статус', value: post.status, type: 'text' },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(post.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(post.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
                                    ])),
                                    actions: [
                                        ({ table, dishands }) => <Delete
                                            table={table}
                                            dishands={dishands}
                                            showModal={showModal}
                                        />,
                                        ({ table, dishands }) => <Mutate
                                            edit
                                            table={table}
                                            dishands={dishands}
                                            showModal={showModal}
                                            data={data}
                                        />,
                                        ({ table, dishands }) => <Mutate
                                            add
                                            table={table}
                                            dishands={dishands}
                                            showModal={showModal}
                                            data={data}
                                        />
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