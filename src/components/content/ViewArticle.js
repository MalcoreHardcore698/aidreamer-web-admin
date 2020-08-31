import React from 'react'
import Moment from 'react-moment'
import Container from '../ui/Container'
import Entry from '../ui/Entry'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ article }) => {
    return (
        <Container>
            <Entry options={{
                capacious: false,
                statusBar: [
                    { lite: 'Comments', dark: article.comments.length || 0 },
                    { lite: 'Views', dark: article.views || 0 },
                    {
                        lite: <Moment date={new Date(new Date().setTime(article.createdAt))} format="MMM, DD" />,
                        dark: <Moment date={new Date(new Date().setTime(article.createdAt))} format="h:m" />
                    }
                ]
            }}>
                <img className="image" src={(article.image.path).replace('./', `${api}/`)} alt="Article" />
                <p className="paragraph">{article.description}</p>
                <p className="body">{article.body}</p>
                <p className="hub">Hub: {article.hub.title}</p>
            </Entry>
        </Container>
    )
}