/*
 * COMPONENT: Table
 * 
 * MISSION: ...
 *
**/

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye,
    faCheck,
    faFilter,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import Row from './Row'
import Container from './Container'
import Button from './Button'
import Search from './Search'
import Message from './Message'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import Radiobox from './Radiobox'
import { getPage, getMaxPage } from '../../utils/functions'
import { config } from '../../utils/config'
import '../styles/Table.css'

const api = config.get('api')

const limitDefault = 10
const limitList = [5, 10, 15, 20, 30, 40, 50]

const Manage = ({ table, actions, dishands }) => {
    return (
        <div className="manage">
            {actions.map((Action, key) =>
                <Action
                    key={key}
                    table={table}
                    dishands={dishands}
                />    
            )}
        </div>
    )
}

const Table = ({
    max,
    name,
    gridable,
    empty="Данные отсутсвуют",

    page,
    setPage,

    table,
    setTable,

    limits,
    setLimits,

    headers,
    setHeaders
}) => {
    return (
        <div className={`data ${name}`}>
            {/*<Descriptors
                table={table}
                setTable={setTable}

                limits={limits}
                setLimits={setLimits}

                headers={headers}
                setHeaders={setHeaders}
            />*/}

            <Pagination
                max={max}
                page={page}
                setPage={setPage}
            />

            <div className={`table${gridable ? ' gridable' : ''}`}>
                {!gridable && <Headers table={table} setTable={setTable} />}

                {(table.length === 0)
                    ? <Message text={empty} padding />
                    : <Body table={table} setTable={setTable} />}
            </div>

            <Pagination
                max={max}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}

// eslint-disable-next-line
const Descriptor = (props) => {
    const {
        size,
        type,
        icon,
        styles,
        children
    } = props

    const Children = children

    const [dropdown, setDropdown] = useState(false)
    
    return (
        <Container clear sticky>
            <Button options={{
                state: 'icon inactive',
                disabled: (size === 0),
                handler: () => setDropdown(!dropdown)
            }}>
                <FontAwesomeIcon icon={icon} />
            </Button>

            <Dropdown options={{ type, styles, dropdown }}>
                {Children}
            </Dropdown>
        </Container>
    )
}

// eslint-disable-next-line
const Descriptors = ({
    table,
    setTable,

    headers,
    setHeaders,

    limits,
    setLimits
}) => {
    const size = table.length

    const handlerVisible = (headers) => {
        let checkedCount = headers.reduce((prev, curr) => (curr.checked) ? prev + 1 : prev, 0)
        
        if (checkedCount < 1) return headers

        setHeaders(headers)

        setTable(table.map(t =>
            ({
                ...t,
                data: t.data.map((c, i) => ({
                    ...c,
                    visible: headers[i].checked
                }))
            })
        ))
    }

    return (
        <div className="descriptors">
            <Search />

            {(limits) && <Descriptor
                size={size}
                type="filter"
                icon={faFilter}
                styles={{ width: 96 }}
            >
                <Radiobox options={{
                    list: limits,
                    handler: setLimits
                }} />
            </Descriptor>}

            {(headers) && <Descriptor
                size={size}
                type="visible"
                icon={faEye}
            >
                <Checkbox options={{
                    state: headers,
                    list: headers,
                    handler: handlerVisible
                }} />
            </Descriptor>}
        </div>
    )
}

const Headers = ({ table, setTable }) => {
    const [checked, setChecked] = useState(false)

    const handlerChecked = () => {
        setTable([
            ...table.map(trace => ({
                ...trace,
                checked: !checked
            }))
        ])
        setChecked(!checked)
    }

    return (
        <div className="headers">
            {(table.length > 0) ?
                <React.Fragment>
                    <div className={`checkmark${checked ? ' checked' : ''}`} onClick={handlerChecked}>
                        <div className={`checkmarks-item`}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    {table[0].data.map((cell, iter) =>
                        <Header
                            key={iter + 1}
                            iter={iter + 2}
                            cell={cell}
                        />
                    )}
                </React.Fragment>
            : ''}
        </div>
    )
}

const Header = ({ cell, iter }) => {
    if (!cell.visible) return null
    
    return (
        <div
            className={`header ${cell.type}`}
            style={{ gridColumn: `${iter} / ${iter + 1}` }}
        >
            {cell.header}
        </div>
    )
}

const Body = ({ table, setTable }) => {
    return (
        <div className="body">
            {table.map((trace, iter) =>
                <Trace key={iter} trace={trace} setTable={setTable} />
            )}
        </div>
    )
}

const Trace = ({ trace, setTable }) => {
    const handlerChecked = () => {
        setTable(table => table.map(t => (t.id === trace.id) ? ({
            ...t,
            checked: !t.checked
        }) : ({ ...t })))
    }

    return (
        <div className={`trace${trace.checked ? ' checked' : ''}`} onClick={handlerChecked}>
            <div className="checkmark">
                <div className="checkmarks-item">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </div>

            {trace.data.map((cell, iter) =>
                <Cell key={iter} cell={cell} iter={iter + 2} />
            )}
        </div>
    )
}

const Cell = ({ cell, iter }) => {
    if (!cell.visible) return null
    
    return (
        <div
            className={`cell ${cell.type}`}
            style={{ gridColumn: `${iter} / ${iter + 1}` }}
        >
            {(cell.type === 'text') &&
                <p>{(cell.value.length > 99) ? `${cell.value.slice(0, 100)}...` : cell.value}</p>}
            {(cell.type === 'color') &&
                <span style={{ background: cell.value || 'black' }}></span>}
            {(cell.type === 'img') &&
                <img src={(cell.value).replace('./', `${api}/`)} alt={cell.value} />}
            {(cell.type === 'icon') &&
                <img className="icon" src={(cell.value).replace('./', `${api}/`)} alt={cell.value} />}
            {(cell.type === 'hub') &&
                <img className="hub" src={`${api}${cell.value.replace('./', '/')}`} alt={cell.value} />}
        </div>
    )
}

const Pagination = ({ page, min=0, max=0, setPage }) => {
    const renderPages = () => {
        const pages = []
        for (let i = min; i < (max + 1); i++) {
            if (i < 5) {
                pages.push(
                    <Button key={i} options={{
                        state: (page === i) ? 'disabled icon inactive' : 'active icon',
                        disabled: (page === i),
                        classNames: 'grow',
                        handler: () => setPage(i)
                    }}>
                        <p>{i + 1}</p>
                    </Button>
                )
            }
        }
        return pages.map(page => page)
    }
    
    return (
        <div className="pagination">
            <Button options={{
                state: (page === min) ? 'disabled icon inactive' : 'active icon',
                disabled: (page === min),
                classNames: 'grow',
                handler: () => setPage(page - 1)
            }}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Button>

            <Row>{renderPages()}</Row>

            <Button options={{
                state: (page === max) ? 'disabled icon inactive' : 'active icon',
                disabled: (page === max),
                classNames: 'grow',
                handler: () => setPage(page + 1)
            }}>
                <FontAwesomeIcon icon={faArrowRight} />
            </Button>
        </div>
    )
}

export default ({ options }) => {
    const [table, setTable] = useState([])

    const [dishands, setDishands] = useState(true)
    const [page, setPage] = useState(0)

    const [headers, setHeaders] = useState([])

    const [limits, setLimits] = useState(limitList.map((l, i) => ({
        id: i,
        value: l,
        checked: (limitDefault === l)
    })))

    const {
        name='default',
        data=[],
        dataTable=[],
        actions=[]
    } = options || {}

    const classes = [
        'ui-table'
    ]

    useEffect(() => {
        if (dataTable) {
            const limit = limits?.find(l => l.checked)?.value || limitDefault
            const content = getPage(dataTable, limit, page)

            setTable(content.map((trace, i) => ({
                ...data[i],
                _id: data[i].id,
                id: i,
                data: trace.map((cell, j) => ({
                    id: `cell-${i}-${j}`,
                    header: cell.header,
                    value: cell.value,
                    type: cell.type,
                    sortabled: cell.hasOwnProperty('sortabled')
                        ? cell.sortabled
                        : false,
                    visible: cell.hasOwnProperty('visible')
                        ? cell.visible 
                        : true
                })),
                checked: false
            })))
        }
    }, [dataTable, data, limits, page])

    useEffect(() => {
        const checked = table.filter(t => t.checked)
        if (checked.length > 0) setDishands(false)
        else setDishands(true)
    }, [table])

    useEffect(() => {
        if (table) {
            setHeaders(table[0]?.data.map((tr, i) => ({
                id: i,
                title: tr.header,
                checked: tr.visible
            })))
        }
    }, [table])

    return (
        <div className={classes.join(' ')}>
            <Manage
                table={table}
                actions={actions}
                dishands={dishands}
            />
            <Table
                name={name}

                table={table}
                setTable={setTable}

                page={page}
                setPage={setPage}
                max={getMaxPage(dataTable, limits?.find(l => l.checked)?.value || limitDefault)}

                limits={limits}
                setLimits={setLimits}

                headers={headers}
                setHeaders={setHeaders}
            />
        </div>
    )
}