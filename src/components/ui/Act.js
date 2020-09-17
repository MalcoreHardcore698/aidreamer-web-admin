import React from 'react'
import Avatar from './Avatar'
import List from './List'
import Message from './Message'
import CounterBadge from './CounterBadge'
import ViewEmpty from './../content/ViewEmpty'

export default ({ options }) => {
    const {
        type,
        act,
        showModal
    } = options || {}

    const classes = [
        'ui-act',
        type
    ]

    return (
        <div className={classes.join(' ')}>
            <h2 className="title">{act.title}</h2>
            <p className="description">{act.description}</p>

            {(act.tasks.length > 0) ? <List options={{
                list: act.tasks,
                handlerItem: (item) => {
                    showModal([
                        {
                            path: '/',
                            title: item.title,
                            component: () => <ViewEmpty />
                        }
                    ], true)
                }
            }}>
                {({ task }) => (
                    <React.Fragment key={task.id}>
                        <Avatar avatar={{ path: task.icon.path }} />
                        <p className="name">{task.title}</p>
                        <CounterBadge options={{
                            type: (task.awards.reduce((acc, curr) => acc + curr) > 9) ? 'circle' : '',
                            background: 'var(--color-graydark)',
                            color: 'white',
                            count: task.awards.reduce((acc, curr) => acc + curr)
                        }} />
                    </React.Fragment>
                )}
            </List>
            : <Message text="No Content" padding />}
        </div>
    )
}