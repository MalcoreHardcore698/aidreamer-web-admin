import React from 'react'
import Moment from 'react-moment'
import Container from '../ui/Container'
import Entry from '../ui/Entry'

export default ({ offer }) => {
    return (
        <Container type="clear">
            <Entry options={{
                capacious: false,
                userBar: {
                    name: offer.user.name,
                    status: offer.user.status || 'Online',
                    avatar: offer.user.avatar?.path
                },
                statusBar: {
                    options: [
                        {
                            lite: <Moment date={new Date(new Date().setTime(offer.createdAt))} format="MMM, DD" />,
                            dark: <Moment date={new Date(new Date().setTime(offer.createdAt))} format="h:m" />
                        }
                    ]
                }
            }}>
                <p className="tag" style={{ background: offer.hub.color }}>{offer.hub.title}</p>
                <h2 className="title">{offer.title}</h2>
                <p>{offer.message}</p>
                <p>Hub: {offer.hub.title}</p>
            </Entry>
        </Container>
    )
}