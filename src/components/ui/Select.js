/*
 * COMPONENT: Select
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import Select, { components } from 'react-select'
import '../styles/Select.css'

const styles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: '40px',
        border: (state.isFocused || state.isSelected) ? '1px solid var(--color-accent)' : '1px solid #afbdc4',
        borderRadius: '8px',
        boxShadow: 'none',
        background: 'transparent',
        color: '#afbdc4',
        cursor: 'pointer',
        transition: 'var(--transition)'
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '5px'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--color-accent)',
        fontWeight: '600',
        fontSize: '14px',
        fontFamily: '"Roboto", sans-serif',
        boxShadow: 'none',
        transition: 'var(--transition)'
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: (state.isFocused) ? 'var(--color-accent)' : '#afbdc4',
        fontWeight: '600',
        fontSize: '14px',
        fontFamily: '"Roboto", sans-serif',
        transition: 'var(--transition)'
    }),
    menu: (provided) => ({
        ...provided,
        background: 'white',
        boxShadow: 'var(--bx-main)',
        borderRadius: 'var(--br-main)',
        border: 'var(--border-main)'
    }),
    option: (provided, state) => ({
        ...provided,
        color: (state.isFocused) ? 'var(--color-accent)' : '#afbdc4',
        fontWeight: '600',
        fontSize: '14px',
        fontFamily: '"Roboto", sans-serif',
        background: 'none !important',
        cursor: 'pointer',
        transition: 'var(--transition)'
    }),
    multiValue: (provided) => ({
        ...provided,
        borderRadius: '5px',
        background: 'var(--color-accent)',
        color: 'white'
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'white',
        fontFamily: '"Roboto", sans-serif',
        fontSize: '12px'
    }),
}

const Menu = (props) => {
    return (
        <div className="ui-select-menu">
            <components.Menu {...props}>{props.children}</components.Menu>
        </div>
    )
}

export default ({ options }) => {
    const classes = [
        'ui-select'
    ]

    return (
        <div className={classes.join(' ')}>
            <Select {...options} styles={styles} components={{ Menu }} />
        </div>
    )
}