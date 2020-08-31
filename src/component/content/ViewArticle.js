import React from 'react'
import Moment from 'react-moment'
import Container from '../ui/Container'
import Entry from '../ui/Entry'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ news }) => {
    return (
        <Container>
            <Entry options={{
                capacious: false,
                statusBar: [
                    { lite: 'Comments', dark: news.comments.length || 0 },
                    { lite: 'Views', dark: news.views || 0 },
                    {
                        lite: <Moment date={new Date(new Date().setTime(news.createdAt))} format="MMM, DD" />,
                        dark: <Moment date={new Date(new Date().setTime(news.createdAt))} format="h:m" />
                    }
                ]
            }}>
                <img className="image" src={(news.image.path).replace('./', `${api}/`)} alt="Article" />
                <p className="paragraph">{news.description}</p>
                <p className="body">{news.body}</p>
                <p className="hub">Hub: {news.hub.title}</p>
            </Entry>
        </Container>
    )
}