import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import List from '../ui/List'
import Avatar from '../ui/Avatar'
import Input from '../ui/Input'
import Entry from '../ui/Entry'
import { config } from '../../utils/config'
import { ADD_COMMENT } from '../../utils/queries'

const api = config.get('api')

export default ({ article }) => {
    const state = useSelector(state => state)

    const inputRef = useRef(null)

    return (
        <Container type="fat clear">
            <Entry options={{
                capacious: false,
                statusBar: {
                    options: [
                        { lite: 'Comments', dark: article.comments.length || 0 },
                        { lite: 'Views', dark: article.views || 0 },
                        {
                            lite: <Moment date={new Date(new Date().setTime(article.createdAt))} format="MMM, DD" />,
                            dark: <Moment date={new Date(new Date().setTime(article.createdAt))} format="h:m" />
                        }
                    ],
                    input: (
                        <React.Fragment>
                            <Avatar avatar={{ path: state.user.avatar.path }} properties={['circle']} />
                            <Mutation query={ADD_COMMENT}>
                                {({ action }) => (
                                    <Input options={{
                                        ref: inputRef,
                                        onKeyPress: async (e) => {
                                            try {
                                                if (e.key === 'Enter') {
                                                    e.persist()
                                                    
                                                    const text = e.target.value
                                                    e.target.value = ''
        
                                                    await action({
                                                        variables: {
                                                            article: article.id,
                                                            text
                                                        }
                                                    })
                                                }
                                            } catch {
                                                console.error('Server Error')
                                            }
                                        }
                                    }} />
                                )}
                            </Mutation>
                        </React.Fragment>
                    ),
                    body: (
                        (article.comments.length > 0) ?
                        <List options={{ list: article.comments }}>
                            {({ item }) => (
                                <React.Fragment>
                                    <p className="avatar">
                                        <img src={item.user.avatar.path} alt="User" />
                                    </p>
                                    <div className="content">
                                        <div className="top">
                                            <p className="name">{item.user.name}</p>
                                            <p className="date">
                                                <Moment date={new Date(new Date().setTime(item.createdAt))} format="h:m" />
                                            </p>
                                        </div>

                                        <p className="text">{item.text}</p>
                                    </div>
                                    {(item.user.name !== state.user.name) && (
                                        <div className="reply">
                                            <Button options={{
                                                state: 'icon inactive',
                                                handler: () => {
                                                    inputRef.current.value = `@${item.user.name} `
                                                }
                                            }}>
                                                <FontAwesomeIcon icon={faReply} />
                                            </Button>
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </List> : null
                    )
                }
            }}>
                {(article.image && article.image.path) && <img
                        className="image large"
                        src={(article.image.path).replace('./', `${api}/`)}
                        alt="Article"
                    />
                }
                <p className="title">{article.title}</p>
                <p className="body">{article.body}</p>
                <p className="hub">Hub: {article.hub.title}</p>
            </Entry>
        </Container>
    )
}