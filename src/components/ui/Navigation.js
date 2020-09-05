import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import Divider from './Divider'
import '../styles/Navigation.css'

const Block = ({ children }) =>
    <div className="block">{children}</div>

export default ({ options }) => {
    const {
        links,
        buttons,
        dashboard,
        axis
    } = options

    const classes = [
        'ui-navigation',
        (dashboard) ? 'dashboard' : '',
        axis
    ]

    const renderLinks = () => {
        return links.map((link, key) => (
            <React.Fragment key={key}>
                {(link.groupTitle) && <p className="title">{link.groupTitle}</p>}
                <NavLink exact key={key} to={link.path} className={link.type}>
                    {link.component}
                </NavLink>
            </React.Fragment>
        ))
    }

    const renderButtons = () => {
        return buttons.map((button, key) =>
            <Button key={key} options={button.options}>
                {button.component}
            </Button>)
    }

    return (
        <div className={classes.join(' ')}>
            <Block>{renderLinks()}</Block>
            <Block>
                <Divider />
                {renderButtons()}
            </Block>
        </div>
    )
}