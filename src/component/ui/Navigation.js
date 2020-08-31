import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import '../styles/Navigation.css'

const Block = ({ children }) =>
    <div className="block">{children}</div>

export default ({ options }) => {
    const {
        links,
        buttons,
        axis
    } = options

    const classes = [
        'ui-navigation',
        axis
    ]

    const renderLinks = () => {
        return links.map((link, key) =>
            <NavLink key={key} exact to={link.path}>
                {link.component}
            </NavLink>)
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
            <Block>{renderButtons()}</Block>
        </div>
    )
}