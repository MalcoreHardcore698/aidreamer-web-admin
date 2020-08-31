import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'

import Query from './ui/Query'
import Subscription from './ui/Subscription'
import Row from './ui/Row'
import Headline from './ui/Headline'
import Button from './ui/Button'
import Search from './ui/Search'
import Toggler from './ui/Toggler'
import Section from './ui/Section'
import Entry from './ui/Entry'

import AddArticle from './content/AddArticle'
import EditArticle from './content/EditArticle'
import ViewArticle from './content/ViewArticle'
import DeleteEntry from './content/DeleteEntry'

import targets from '../stores/targets'
import hubs from '../stores/hubs'

import { config } from '../utils/config'
import {
    GET_USER_ARTICLES,
    GET_ALL_ARTICLES,
    DELETE_ARTICLE,
    SUB_ARTICLES,
    SUB_USER_ARTICLES
} from '../utils/queries'

const api = config.get('api')

export default ({ showModal, hideModal }) => {
    const state = useSelector(state => state)

    if (!state.user) return null
    
    return (
        <main className="home">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Aid</span>
                        <span>Reamer</span>
                    </Headline>

                    <Button options={{
                        type: 'icon',
                        state: 'inactive'
                    }}>
                        <FontAwesomeIcon icon={faFilter} />
                    </Button>
                </Row>

                <Search />

                <Button options={{
                    type: 'inactive',
                    handler: () => {
                        showModal([
                            {
                                path: '/',
                                title: 'Add Article',
                                component: ({ jump }) => <AddArticle jump={jump} hideModal={hideModal} />
                            }
                        ])
                    }
                }}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>

                <Query query={GET_USER_ARTICLES} variables={{ id: state.user.id }}>
                    {({ data, refetch }) =>
                        <Subscription query={SUB_USER_ARTICLES} variables={{ id: state.user.id }} refetch={refetch}>
                            {({ subData }) => ((subData && subData.articles) || data.allUserNews).map((news, key) =>
                                <Entry key={key} options={{
                                    editable: true,
                                    capacious: false,
                                    manageOffset: true,
                                    statusBar: [
                                        { lite: 'Comments', dark: news.comments.length || 0 },
                                        { lite: 'Views', dark: news.views || 0 },
                                        {
                                            lite: <Moment date={new Date(new Date().setTime(news.createdAt))} format="MMM, DD" />,
                                            dark: <Moment date={new Date(new Date().setTime(news.createdAt))} format="h:m" />
                                        }
                                    ],
                                    handlerEdit: () => showModal([
                                        {
                                            path: '/',
                                            title: 'Edit Article',
                                            component: () => <EditArticle news={news} hideModal={hideModal} />
                                        }
                                    ]),
                                    handlerDelete: () => showModal([
                                        {
                                            path: '/',
                                            title: 'Delete Article',
                                            component: () => <DeleteEntry entry={news} query={DELETE_ARTICLE} hideModal={hideModal} />
                                        }
                                    ])
                                }}>
                                    <img className="image" src={(news.image.path).replace('./', `${api}/`)} alt="Article" />
                                    <h2 className="title">{news.title}</h2>
                                    <p className="paragraph">{news.description}</p>
                                </Entry>
                            )}
                        </Subscription>
                    }
                </Query>
            </aside>

            <aside>
                <Toggler options={{ type: 'auto', targets: hubs.map((hub, key) => ({
                    type: hub.type,
                    value: <Row key={key}>
                                <div className="icon">
                                    <FontAwesomeIcon icon={hub.icon} />
                                </div>
                                <p>{hub.title}</p>
                            </Row>
                        }))
                    }}
                />

                <Section options={{
                    name: 'news',
                    title: 'News',
                    subtitle: 'All',
                    targets
                }}>
                    <Query query={GET_ALL_ARTICLES} variables={{ status: 'PUBLISHED' }}>
                        {({ data, refetch }) =>
                            <Subscription query={SUB_ARTICLES} refetch={refetch}>
                                {({ subData }) => ((subData && subData.articles) || data.allNews).map((news, key) =>
                                    <Entry key={key} options={{
                                        capacious: false,
                                        userBar: {
                                            name: news.author.name,
                                            status: news.author.status || 'Online',
                                            avatar: news.author.avatar?.path
                                        },
                                        statusBar: [
                                            { lite: 'Comments', dark: news.comments.length || 0 },
                                            { lite: 'Views', dark: news.views || 0 },
                                            {
                                                lite: <Moment date={new Date(new Date().setTime(news.createdAt))} format="MMM, DD" />,
                                                dark: <Moment date={new Date(new Date().setTime(news.createdAt))} format="h:m" />
                                            }
                                        ],
                                        handler: () => showModal([
                                            {
                                                path: '/',
                                                title: news.title,
                                                component: () => <ViewArticle news={news} />
                                            }
                                        ])
                                    }}>
                                        <img className="image" src={(news.image.path).replace('./', `${api}/`)} alt="Article" />
                                        <h2 className="title">{news.title}</h2>
                                        <p className="paragraph">{news.description}</p>
                                    </Entry>
                                )}
                            </Subscription>
                        }
                    </Query>
                </Section>
            </aside>
        </main>
    )
}