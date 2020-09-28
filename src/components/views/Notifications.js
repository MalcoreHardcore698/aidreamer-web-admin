import React from 'react'
import Moment from 'react-moment'
import Container from '../ui/Container'
import Query from '../ui/Query'
import Subscription from '../ui/Subscription'
import Message from '../ui/Message'
import List from '../ui/List'
import Avatar from '../ui/Avatar'

import {
    GET_USER_NOTIFICATIONS,
    SUB_NOTIFICATIONS
} from '../../utils/queries'

export default () => {
    return (
        <Container>
            <Query query={GET_USER_NOTIFICATIONS} pseudo={{ height: 45, count: 6 }}>
                {({ data, refetch }) => (
                    <Subscription query={SUB_NOTIFICATIONS} refetch={refetch}>
                        {({ subData }) => {
                            const notifications = ((subData && subData.notifications) || data.allUserNotifications)

                            if (notifications.length === 0)
                                return <Message text="Empty" padding />

                            return (
                                (notifications.length > 0) ?
                                <List options={{ list: notifications }}>
                                    {({ item }) => (
                                        <React.Fragment>
                                            <Avatar avatar={{ path: item?.user?.avatar?.path }} properties={['circle']} />
                                            <p className="name">{item.text}</p>
                                            <p className="date">
                                                <Moment date={new Date(new Date().setTime(item.createdAt))} format="h:m" />
                                            </p>
                                        </React.Fragment>
                                    )}
                                </List> :
                                <Message text="No Comments" padding />
                            )
                        }}
                    </Subscription>
                )}
            </Query>
        </Container>
    )
}