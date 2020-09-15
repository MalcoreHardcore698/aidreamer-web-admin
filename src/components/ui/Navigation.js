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
        return links.map((group, key) => (
            <React.Fragment key={key}>
                <p className="title">{group.title}</p>
                <div className="links">
                    {group.links.map((link, index) =>
                        <NavLink
                            exact
                            key={index}
                            to={link.path}
                            className={link.type}
                            onClick={link.handler}
                        >
                            {link.component}
                        </NavLink>
                    )}
                </div>
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