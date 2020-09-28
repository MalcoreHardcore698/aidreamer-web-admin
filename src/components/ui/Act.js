import React from 'react'
import Avatar from './Avatar'
import Frame from './Frame'
import List from './List'
import Message from './Message'
import SVGExpIcon from '../../assets/images/exp-icon.svg'
import SVGGemIcon from '../../assets/images/gem-icon.svg'
import '../styles/Act.css'

function getAwardIcon(type) {
    if (type === 'EXP')
        return SVGExpIcon
    else
        return SVGGemIcon
}

export default ({ options }) => {
    const {
        type,
        act,
        handler
    } = options || {}

    const classes = [
        'ui-act',
        type
    ]

    return (
        <div className={classes.join(' ')}>
            <Frame value={act.act.title} legend="Act" />

            {(act.act.tasks.length > 0) ? <List options={{
                list: act.act.tasks.map(t => ({
                    ...t,
                    _condition: act?.tasks?.find(_t => (_t.task.id === t.id) && (_t.status === 'COMPLETED'))
                })),
                handlerItem: (item) => handler(item)
            }}>
                {({ item }) => (
                    <React.Fragment>
                        <Avatar avatar={{ path: item.icon.path }} />
                        <div className="text">
                            <p className="name">
                                <span>{item.title}</span>
                                {item.awards.map(award =>
                                    <span key={award.id} className="award">{
                                        <img src={getAwardIcon(award.award)} alt="Icon" />
                                    }</span>    
                                )}
                            </p>
                            <p className="condition">{item.translation}</p>
                        </div>
                    </React.Fragment>
                )}
            </List>
            : <Message text="No Content" padding />}
        </div>
    )
}