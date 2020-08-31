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
import { useSelector, useDispatch } from 'react-redux'
import { setDataTable } from '../../utils/actions'
import Row from './Row'
import Container from './Container'
import Button from './Button'
import Search from './Search'
import Message from './Message'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import Radiobox from './Radiobox'
import { getPage, getMaxPage } from '../../utils/functions'
import '../styles/Table.css'

const limitDefault = 10
const limitList = [5, 10, 15, 20, 30, 40, 50]

const Manage = ({ actions, dishands }) => {
    const state = useSelector(state => state)

    return (
        <div className="manage">
            {actions.map((Action, key) =>
                <Action
                    key={key}
                    table={state.table}
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

    limits,
    setLimits,

    headers,
    setHeaders
}) => {
    const state = useSelector(state => state)

    return (
        <div className={`data ${name}`}>
            <Descriptors
                limits={limits}
                setLimits={setLimits}

                headers={headers}
                setHeaders={setHeaders}
            />

            <Pagination
                max={max}
                page={page}
                setPage={setPage}
            />

            <div className={`table${gridable ? ' gridable' : ''}`}>
                {!gridable && <Headers />}

                {(state.table.length === 0)
                    ? <Message text={empty} padding />
                    : <Body />
                }
            </div>

            <Pagination
                max={max}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}

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
                type: 'icon',
                state: 'inactive',
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

const Descriptors = ({
    headers,
    setHeaders,

    limits,
    setLimits
}) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const size = state.table.length

    const handlerVisible = (headers) => {
        let checkedCount = headers.reduce((prev, curr) => (curr.checked) ? prev + 1 : prev, 0)
        
        if (checkedCount < 1) return headers

        setHeaders(headers)

        dispatch(setDataTable(state.table.map(t =>
            ({
                ...t,
                data: t.data.map((c, i) => ({
                    ...c,
                    visible: headers[i].checked
                }))
            })
        )))
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
                    list: headers,
                    handler: handlerVisible
                }} />
            </Descriptor>}
        </div>
    )
}

const Headers = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [checked, setChecked] = useState(false)

    const handlerChecked = () => {
        dispatch(setDataTable([
            ...state.table.map(trace => ({
                ...trace,
                checked: !checked
            }))
        ]))
        setChecked(!checked)
    }

    return (
        <div className="headers">
            {(state.table.length > 0) ?
                <React.Fragment>
                    <div className={`checkmark${checked ? ' checked' : ''}`} onClick={handlerChecked}>
                        <div className={`checkmarks-item`}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    {state.table[0].data.map((cell, iter) =>
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

const Body = () => {
    const state = useSelector(state => state)

    return (
        <div className="body">
            {state.table.map((trace, iter) =>
                <Trace key={iter} trace={trace} />
            )}
        </div>
    )
}

const Trace = ({ trace }) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const handlerChecked = () => {
        dispatch(setDataTable(state.table.map(t => (t.id === trace.id) ? ({
            ...t,
            checked: !t.checked
        }) : ({ ...t }))))
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
                <p>{cell.value}</p>}
            {(cell.type === 'color') &&
                <span style={{ background: cell.value || 'black' }}></span>}
            {(cell.type === 'img') &&
                <img src={`http://localhost:5000${cell.value.replace('./', '/')}`} alt={cell.value} />}
            {(cell.type === 'icon') &&
                <img className="icon" src={`http://localhost:5000${cell.value.replace('./', '/')}`} alt={cell.value} />}
            {(cell.type === 'hub') &&
                <img className="hub" src={`http://localhost:5000${cell.value.replace('./', '/')}`} alt={cell.value} />}
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
                        type: 'icon',
                        state: (page === i) ? 'disabled' : 'active',
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
                type: 'icon',
                state: (page === min) ? 'disabled' : 'active',
                disabled: (page === min),
                classNames: 'grow',
                handler: () => setPage(page - 1)
            }}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Button>

            <Row>{renderPages()}</Row>

            <Button options={{
                type: 'icon',
                state: (page === max) ? 'disabled' : 'active',
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
    const state = useSelector(state => state)
    const dispatch = useDispatch()

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
        actions=[]
    } = options || {}

    const classes = [
        'ui-table'
    ]

    useEffect(() => {
        const limit = limits?.find(l => l.checked)?.value || limitDefault
        const content = getPage(data, limit, page)
        const table = content.map((trace, i) => ({
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
        }))

        dispatch(setDataTable(table))
    }, [data, limits, page, dispatch])

    useEffect(() => {
        const checked = state.table.filter(t => t.checked)
        if (checked.length > 0) setDishands(false)
        else setDishands(true)
    }, [state.table])

    useEffect(() => {
        if (state.table) {
            setHeaders(state.table[0]?.data.map((tr, i) => ({
                id: i,
                value: tr.header,
                checked: tr.visible
            })))
        }
    }, [state.table])

    return (
        <div className={classes.join(' ')}>
            <Manage
                actions={actions}
                dishands={dishands}
            />
            <Table
                name={name}

                page={page}
                setPage={setPage}
                max={getMaxPage(data, limits?.find(l => l.checked)?.value || limitDefault)}

                limits={limits}
                setLimits={setLimits}

                headers={headers}
                setHeaders={setHeaders}
            />
        </div>
    )
}