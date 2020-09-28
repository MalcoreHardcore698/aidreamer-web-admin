import React, { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faImage,
    faTrash,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Container from '../ui/Container'
import Form from '../ui/Form'
import List from '../ui/List'
import Message from '../ui/Message'
import Select from '../ui/Select'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Dropdown from '../ui/Dropdown'
import Checkbox from '../ui/Checkbox'
import Toggler from '../ui/Toggler'
import Divider from '../ui/Divider'
import {
    GET_ALL_ICONS,
    GET_ALL_AWARDS,
    GET_ALL_CONDITION_ENUMS,
    GET_ALL_USERS,
    GET_ALL_POSTS,
    GET_ALL_HUBS,
    GET_ALL_ACTS,
    GET_ALL_STATUS,
    ADD_ACT,
    EDIT_ACT
} from '../../utils/queries'
import { config } from '../../utils/config'
import { v4 } from 'uuid'

const api = config.get('api')

const AREAS_QUERIES = {
    'USER': GET_ALL_USERS,
    'POST': GET_ALL_POSTS,
    'HUB': GET_ALL_HUBS
}

const ActTasks = ({ register, tasks, setTasks }) => {
    return (
        <div className="ui-tasks">
            <div className="manage">
                <Row type="flex">
                    <Button options={{
                        state: 'inactive icon',
                        handler: () => {
                            setTasks(prev => ([
                                ...prev,
                                {
                                    id: v4(),
                                    title: null,
                                    icon: {},
                                    condition: [],
                                    awards: [],
                                    isDropdownIcons: false
                                }
                            ]))
                        }
                    }}>
                        <Row type="flex center">
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Add Task</p>
                        </Row>
                    </Button>
                </Row>
            </div>
            
            <ul className="content">
                {(tasks.length > 0) ? tasks.map((task) => (
                    <li key={task.id} className="ui-task">
                        <Row type="flex" className="header">
                            <Container clear sticky>
                                <Query query={GET_ALL_ICONS} pseudo={{ count: 1, height: 45 }}>
                                    {({ data }) => (
                                        <React.Fragment>
                                            <Button options={{
                                                state: 'inactive',
                                                handler: () => {
                                                    setTasks(prev => prev.map((_task) =>
                                                        (_task.id === task.id) ? ({
                                                            ..._task,
                                                            dropdownIcons: !_task.dropdownIcons
                                                        }) : ({
                                                            ..._task
                                                        })
                                                    ))
                                                }
                                            }}>
                                                {(task.icon.path) ? (
                                                    <img
                                                        className="image"
                                                        src={(task.icon.path).replace('./', `${api}/`)}
                                                        alt="Hub"
                                                    />
                                                )
                                                : <FontAwesomeIcon icon={faImage} />}
                                            </Button>

                                            <Dropdown options={{ dropdown: task.dropdownIcons, styles: { left: 0 } }}>
                                                {(data && data.allIcons) ? <List options={{
                                                    type: 'grid',
                                                    state: task.icon,
                                                    list: data.allIcons,
                                                    handlerItem: (item) => {
                                                        setTasks(prev => prev.map((_task) =>
                                                            (_task.id === task.id) ? ({
                                                                ..._task,
                                                                dropdownIcons: false,
                                                                icon: item
                                                            }) : ({
                                                                ..._task
                                                            })
                                                        ))
                                                    }
                                                }}>
                                                    {({ item }) => (
                                                        <img
                                                            className="image"
                                                            src={(item.path).replace('./', `${api}/`)}
                                                            alt="Hub"
                                                        />
                                                    )}
                                                </List> : <Message text="No Icons" padding />}
                                            </Dropdown>
                                        </React.Fragment>
                                    )}
                                </Query>
                            </Container>
                            <Input options={{
                                ref: register(),
                                type: 'text',
                                state: 'minimize',
                                name: `[task_${task.id}][title]`,
                                defaultValue: task.title || '',
                                placeholder: 'Enter title'
                            }} />
                            <Button options={{
                                state: 'inactive icon',
                                handler: () => {
                                    setTasks(prev => prev.filter((_task) =>
                                        (task.id !== _task.id)
                                    ))
                                }
                            }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Row>

                        <div className="condition">
                            <Button options={{
                                state: 'inactive',
                                handler: () => {
                                    setTasks(prev => prev.map((_task) =>
                                        (_task.id === task.id) ? ({
                                            ..._task,
                                            condition: _task.condition.concat({
                                                id: v4(),
                                                action: null,
                                                target: null,
                                                goals: [],
                                                multiply: null,
                                                specific: {
                                                    id: null,
                                                    area: null
                                                },
                                                union: null,
                                                link: null,
                                                isComplexCondition: []
                                            })
                                        }) : ({
                                            ..._task
                                        })
                                    ))
                                }
                            }}>
                                <Row type="flex center">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <p>Add Condition</p>
                                </Row>
                            </Button>

                            <ul className="list">
                                <Query query={GET_ALL_CONDITION_ENUMS} pseudo={{ count: 1, height: 90 }}>
                                    {({ data }) => (
                                        (task.condition?.length > 0) ? task.condition.map((condition, j) => (
                                            <li key={condition.id} className="item">
                                                
                                                <div className="manage">
                                                    <Button options={{
                                                        state: 'inactive icon',
                                                        handler: () => {
                                                            setTasks(prev => prev.map((_task) =>
                                                                (_task.id === task.id) ? ({
                                                                    ..._task,
                                                                    condition: _task.condition.filter((_condition) =>
                                                                        (_condition.id !== condition.id)    
                                                                    )
                                                                }) : ({
                                                                    ..._task
                                                                })
                                                            ))
                                                        }
                                                    }}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </div>

                                                <div className="content">
                                                    <p className="ui-title">Condition {j + 1}</p>
                                                    <Select options={{
                                                        name: `[task_${task.id}][condition_${condition.id}][action]`,
                                                        value: condition.action,
                                                        placeholder: 'Choose action',
                                                        options: data.allActions.map(a => ({
                                                            value: a,
                                                            label: a
                                                        })),
                                                        onChange: (e) => {
                                                            setTasks(prev => prev.map((_task) =>
                                                                (_task.id === task.id) ? ({
                                                                    ..._task,
                                                                    condition: _task.condition.map((_condition) =>
                                                                        (_condition.id === condition.id) ? ({
                                                                            ..._condition,
                                                                            action: e
                                                                        }) : ({
                                                                            ..._condition
                                                                        })
                                                                    )
                                                                }) : ({
                                                                    ..._task
                                                                })    
                                                            ))
                                                        }
                                                    }} />
                                                    <Select options={{
                                                        name: `[task_${task.id}][condition_${condition.id}][target]`,
                                                        value: condition.target,
                                                        placeholder: 'Choose target',
                                                        options: data.allAreas.map(a => ({
                                                            value: a,
                                                            label: a
                                                        })),
                                                        onChange: (e) => {
                                                            setTasks(prev => prev.map((_task) =>
                                                                (_task.id === task.id) ? ({
                                                                    ..._task,
                                                                    condition: _task.condition.map((_condition) =>
                                                                        (_condition.id === condition.id) ? ({
                                                                            ..._condition,
                                                                            target: e
                                                                        }) : ({
                                                                            ..._condition
                                                                        })
                                                                    )
                                                                }) : ({
                                                                    ..._task
                                                                })    
                                                            ))
                                                        }
                                                    }} />
                                                    <Select options={{
                                                        name: `[task_${task.id}][condition_${condition.id}][goals]`,
                                                        value: condition.goals,
                                                        placeholder: 'Choose goals',
                                                        options: data.allGoals.map(a => ({
                                                            value: a,
                                                            label: a
                                                        })),
                                                        closeMenuOnSelect: false,
                                                        isMulti: true,
                                                        onChange: (e) => {
                                                            setTasks(prev => prev.map((_task) =>
                                                                (_task.id === task.id) ? ({
                                                                    ..._task,
                                                                    condition: _task.condition.map((_condition) =>
                                                                        (_condition.id === condition.id) ? ({
                                                                            ..._condition,
                                                                            goals: e
                                                                        }) : ({
                                                                            ..._condition
                                                                        })
                                                                    )
                                                                }) : ({
                                                                    ..._task
                                                                })    
                                                            ))
                                                        }
                                                    }} />
                                                    {((condition.goals?.length > 0) && condition.goals.find(g => g.value === 'QUANTITY') && (
                                                        <Input options={{
                                                            ref: register(),
                                                            type: 'number',
                                                            defaultValue: condition?.multiply || '',
                                                            name: `[task_${task.id}][condition_${condition.id}][multiply]`,
                                                            placeholder: 'Enter multiply'
                                                        }} />
                                                    ))}
                                                    {((condition.goals?.length > 0) && condition.goals.find(g => g.value === 'SPECIFIC') && (
                                                        <React.Fragment>
                                                            <Select options={{
                                                                name: `[task_${task.id}][condition_${condition.id}][area]`,
                                                                value: condition.specific.area,
                                                                placeholder: 'Choose area',
                                                                options: data.allAreas.map(a => ({
                                                                    value: a,
                                                                    label: a
                                                                })),
                                                                onChange: (e) => {
                                                                    setTasks(prev => prev.map((_task) =>
                                                                        (_task.id === task.id) ? ({
                                                                            ..._task,
                                                                            condition: _task.condition.map((_condition) =>
                                                                                (_condition.id === condition.id) ? ({
                                                                                    ..._condition,
                                                                                    specific: {
                                                                                        area: e
                                                                                    }
                                                                                }) : ({
                                                                                    ..._condition
                                                                                })
                                                                            )
                                                                        }) : ({
                                                                            ..._task
                                                                        })
                                                                    ))
                                                                }
                                                            }} />
                                                            {(condition.specific.area) && (
                                                                <SpecificSelect
                                                                    task={task}
                                                                    condition={condition}
                                                                    setTasks={setTasks}
                                                                />
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                    <Checkbox options={{
                                                        state: condition.isComplexCondition,
                                                        list: [
                                                            { id: 0, title: 'Complex condition' }
                                                        ],
                                                        handler: (item) => {
                                                            setTasks(prev => prev.map((_task) =>
                                                                (_task.id === task.id) ? ({
                                                                    ..._task,
                                                                    condition: _task.condition.map((_condition) =>
                                                                        (_condition.id === condition.id) ? ({
                                                                            ..._condition,
                                                                            isComplexCondition: item
                                                                        }) : ({
                                                                            ..._condition
                                                                        })
                                                                    )
                                                                }) : ({
                                                                    ..._task
                                                                })
                                                            ))
                                                        }
                                                    }} />
                                                    {(condition.isComplexCondition.length > 0) && (
                                                        <Select options={{
                                                            name: `[task_${task.id}][condition_${condition.id}][union]`,
                                                            value: condition.union,
                                                            placeholder: 'Choose union',
                                                            options: data.allUnions.map(u => ({
                                                                value: u,
                                                                label: u
                                                            })),
                                                            onChange: (e) => {
                                                                setTasks(prev => prev.map((_task) =>
                                                                    (_task.id === task.id) ? ({
                                                                        ..._task,
                                                                        condition: _task.condition.map((_condition) =>
                                                                            (_condition.id === condition.id) ? ({
                                                                                ..._condition,
                                                                                union: e
                                                                            }) : ({
                                                                                ..._condition
                                                                            })
                                                                        )
                                                                    }) : ({
                                                                        ..._task
                                                                    })    
                                                                ))
                                                            }
                                                        }} />
                                                    )}
                                                    {((condition.isComplexCondition.length > 0) && condition.union) && (
                                                        (task.condition.length > 1) ? <Select options={{
                                                            name: `[task_${task.id}][condition_${condition.id}][link]`,
                                                            value: condition.link,
                                                            placeholder: 'Choose link',
                                                            options: task.condition
                                                                .map((c, k) => (c.id !== condition.id) ? ({
                                                                    value: c,
                                                                    label: `Condition ${k + 1}`
                                                                }) : null)
                                                                .filter(c => c),
                                                            onChange: (e) => {
                                                                setTasks(prev => prev.map((_task) =>
                                                                    (_task.id === task.id) ? ({
                                                                        ..._task,
                                                                        condition: _task.condition.map((_condition) =>
                                                                            (_condition.id === condition.id) ? ({
                                                                                ..._condition,
                                                                                link: e
                                                                            }) : ({
                                                                                ..._condition
                                                                            })
                                                                        )
                                                                    }) : ({
                                                                        ..._task
                                                                    })    
                                                                ))
                                                            }
                                                        }} /> : <Message text="Please, add new condition for attached link" padding />
                                                    )}
                                                </div>
                                            </li>
                                        )) : <Message text="No Condition" padding />
                                    )}
                                </Query>
                            </ul>
                        </div>

                        <Query query={GET_ALL_AWARDS} pseudo={{ count: 1, height: 45 }}>
                            {({ data }) => {
                                const awardsTypes = data.allAwardTypes

                                return (
                                    <div className="awards">
                                        <Button options={{
                                            state: 'inactive',
                                            disabled: (awardsTypes.length === task.awards.length),
                                            handler: () => {
                                                setTasks(prev => prev.map((_task) =>
                                                    (_task.id === task.id) ? ({
                                                        ..._task,
                                                        awards: [
                                                            ..._task.awards,
                                                            {
                                                                id: v4(),
                                                                award: null,
                                                                quantity: null
                                                            }
                                                        ]
                                                    }) : ({
                                                        ..._task
                                                    })
                                                ))
                                            }
                                        }}>
                                            <Row type="flex center">
                                                <FontAwesomeIcon icon={faPlus} />
                                                <p>Add Award</p>
                                            </Row>
                                        </Button>

                                        <ul className="list">
                                            {(task.awards.length > 0) ? (
                                                task.awards.map((award, j) => (
                                                    <li key={award.id} className="item">
                                                        <div className="manage">
                                                            <Button options={{
                                                                state: 'inactive icon',
                                                                handler: () => {
                                                                    setTasks(prev => prev.map((_task) =>
                                                                        (_task.id === task.id) ? ({
                                                                            ..._task,
                                                                            awards: _task.awards.filter((_award) =>
                                                                                (_award.id !== award.id)    
                                                                            )
                                                                        }) : ({
                                                                            ..._task
                                                                        })
                                                                    ))
                                                                }
                                                            }}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                        </div>

                                                        <div className="content">
                                                            <p className="ui-title">Award {j + 1}</p>

                                                            <Select options={{
                                                                name: `[task_${task.id}][condition_${award.id}][award]`,
                                                                value: award.award,
                                                                placeholder: 'Choose award',
                                                                options: awardsTypes
                                                                    .filter(p => !task.awards
                                                                        .find(a => a.award ? (a.award.value === p) : false)
                                                                    )
                                                                    .map(p => ({
                                                                        value: p,
                                                                        label: p
                                                                    })
                                                                ),
                                                                onChange: (e) => {
                                                                    setTasks(prev => prev.map((_task) =>
                                                                        (_task.id === task.id) ? ({
                                                                            ..._task,
                                                                            awards: _task.awards.map((_award) =>
                                                                                (_award.id === award.id)
                                                                                    ? ({
                                                                                        ..._award,
                                                                                        award: e
                                                                                    }) : ({
                                                                                        ..._award
                                                                                    })
                                                                            )
                                                                        }) : ({
                                                                            ..._task
                                                                        })    
                                                                    ))
                                                                }
                                                            }} />
                                                            <Input options={{
                                                                ref: register(),
                                                                type: 'number',
                                                                defaultValue: award.quantity || '',
                                                                name: `[task_${task.id}][award_${award.id}][value]`,
                                                                placeholder: 'Value'
                                                            }} />
                                                        </div>
                                                    </li>
                                                ))
                                            )
                                            : <Message text="No Awards" padding />}
                                        </ul>
                                    </div>
                                )
                            }}
                        </Query>
                    </li>
                )) : <Message text="No Tasks" padding />}
            </ul>
        </div>
    )
}

const ActAwards = ({ register, actAwards, setActAwards }) => {
    return (
        <Query query={GET_ALL_AWARDS} pseudo={{ count: 1, height: 45 }}>
            {({ data }) => {
                const awardsTypes = data.allAwardTypes

                return (
                    <div className="ui-awards">
                        <div className="manage">
                            <Button options={{
                                state: 'inactive',
                                disabled: (awardsTypes.length === actAwards.length),
                                handler: () => {
                                    setActAwards(prev => ([
                                        ...prev,
                                        {
                                            id: v4(),
                                            award: null,
                                            quantity: null
                                        }
                                    ]))
                                }
                            }}>
                                <Row type="flex center">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <p>Add Act Award</p>
                                </Row>
                            </Button>
                        </div>

                        <ul className="list">
                            {(actAwards.length > 0) ? (
                                actAwards.map((actAward, j) => (
                                    <li key={actAward.id} className="item">
                                        <div className="manage">
                                            <Button options={{
                                                state: 'inactive icon',
                                                handler: () => {
                                                    setActAwards(prev => prev.filter((_actAward) =>
                                                        (_actAward.id !== actAward.id)
                                                    ))
                                                }
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </div>

                                        <div className="content">
                                            <p className="ui-title">Award {j + 1}</p>

                                            <Select options={{
                                                name: `[act][award_${actAward.id}][award]`,
                                                value: actAward.award,
                                                placeholder: 'Choose award',
                                                options: awardsTypes
                                                    .filter(p => !actAwards
                                                        .find(a => a.award ? (a.award.value === p) : false)
                                                    )
                                                    .map(p => ({
                                                        value: p,
                                                        label: p
                                                    })
                                                ),
                                                onChange: (e) => {
                                                    setActAwards(prev => prev.map((_actAward) =>
                                                        (_actAward.id === actAward.id) ? ({
                                                                ..._actAward,
                                                                award: e
                                                            }) : ({
                                                                ..._actAward
                                                            })
                                                        )
                                                    )
                                                }
                                            }} />
                                            <Input options={{
                                                ref: register(),
                                                type: 'number',
                                                name: `[act][award_${actAward.id}][value]`,
                                                defaultValue: actAward.quantity || '',
                                                placeholder: 'Value'
                                            }} />
                                        </div>
                                    </li>
                                ))
                            )
                            : <Message text="No Act Awards" padding />}
                        </ul>
                    </div>
                )
            }}
        </Query>
    )
}

const ActSettings = ({ options }) => {
    const {
        isEnableSuccessor,
        successor,
        status,
        isStatus,
        isSource,
        setSuccessor,
        setEnabledSuccessor,
        setSource,
        setStatus
    } = options
    return (
        <React.Fragment>
            <Row type="flex">
                <Checkbox options={{
                    state: isEnableSuccessor,
                    list: [
                        { id: 0, title: 'Enable successor' }
                    ],
                    handler: (item) => {
                        setEnabledSuccessor(item)
                    }
                }} />
                <Checkbox options={{
                    state: isSource,
                    list: [
                        { id: 0, title: 'Is Source' }
                    ],
                    handler: (item) => {
                        setSource(item)
                    }
                }} />
            </Row>

            <Query query={GET_ALL_ACTS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => {
                    const acts = (data && data.allActs) || []

                    if (acts.length === 0)
                        return <Message text="Please, add new act for attached successor" padding />

                    return (
                        <Select options={{
                            name: `[act][successor]`,
                            value: successor,
                            isDisabled: !isEnableSuccessor[0],
                            placeholder: 'Choose successor',
                            options: acts.map(p => ({
                                value: p,
                                label: p.title
                            })),
                            onChange: (e) => {
                                setSuccessor(e)
                            }
                        }} />
                    )
                }}
            </Query>

            {(isStatus) && <Query query={GET_ALL_STATUS}>
                {({ data }) => (
                    <Toggler options={{
                        state: status,
                        handler: setStatus,
                        targets: [
                            ...data.allStatus.map((item, key) => ({
                                type: item,
                                value: (
                                    <Row key={key}>
                                        <p>{item}</p>
                                    </Row>
                                )}))
                        ]}}
                    />
                )}
            </Query>}
        </React.Fragment>
    )
}

const SpecificSelect = ({ task, condition, setTasks }) => {
    return (
        <Query query={AREAS_QUERIES[condition.specific.area.value]} pseudo={{ count: 1, height: 45 }}>
            {({ data }) => {
                return (
                    <Select options={{
                        name: `[task_${task.id}][condition_${condition.id}][area]`,
                        value: condition.specific.id,
                        placeholder: 'Choose object',
                        options: data[Object.keys(data)[0]].map(obj => ({
                            value: obj,
                            label: obj.title
                        })),
                        onChange: (e) => {
                            setTasks(prev => prev.map((_task) =>
                                (_task.id === task.id) ? ({
                                    ..._task,
                                    condition: _task.condition.map((_condition) =>
                                        (_condition.id === condition.id) ? ({
                                            ..._condition,
                                            specific: {
                                                ..._condition.specific,
                                                id: e
                                            }
                                        }) : ({
                                            ..._condition
                                        })
                                    )
                                }) : ({
                                    ..._task
                                })
                            ))
                        }
                    }} />
                )
            }}
        </Query>
    )
}

export default ({
    document,
    close,
    add=false,
    edit=false,
    editableStatus
}) => {
    const [variables, setVariables] = useState({})

    const [tasks, setTasks] = useState((document?.tasks)
        ? document.tasks.map(task => ({
            ...task,
            awards: task.awards.map(award => ({
                ...award,
                award: { value: award.award, label: award.award },
                quantity: award.quantity
            })),
            condition: task.condition.map(condition => ({
                ...condition,
                action: { value: condition.action, label: condition.action },
                goals: condition?.goals?.map(goal => ({ value: goal, label: goal })),
                target: { value: condition?.target, label: condition?.target },
                union: { value: condition?.union, label: condition?.union },
                link: { value: condition?.link, label: condition?.link },
                isComplexCondition: (condition.union)
                    ? [{ id: 0, title: 'Complex condition' }]
                    : []
            })),
            isDropdownIcons: false
        }))
        : []
    )
    const [actAwards, setActAwards] = useState((document?.awards)
        ? document.awards.map(award => ({
            ...award,
            award: { value: award.award, label: award.award },
            quantity: award.quantity
        }))
        : []
    )

    const [successor, setSuccessor] = useState(document?.successor)
    const [isEnableSuccessor, setEnabledSuccessor] = useState((document?.successor) ? [{ id: 0, title: 'Enable successor' }] : [])
    const [isSource, setSource] = useState((document?.isSource) ? [{ id: 0, title: 'Is Source' }] : [])
    const [status, setStatus] = useState(document?.status)

    const variablesCompose = (form, options) => {
        let awards = []
        if (actAwards) awards = actAwards
            .map(actAward => ({
                    award: actAward.award.value,
                    quantity: +form.act[`award_${actAward.id}`]?.value
                })
            )
        
        return {
            ...options,
            title: form.title,
            description: form.description,
            tasks: tasks.map(task => ({
                id: task.id,
                title: form[`task_${task.id}`]?.title,
                icon: task.icon.id,
                condition: task.condition.map(condition => ({
                    id: condition.id,
                    action: condition.action?.value,
                    goals: condition.goals.map(goal => goal.value),
                    target: condition.target?.value,
                    multiply: +form[`task_${task.id}`][`condition_${condition.id}`]?.multiply,
                    union: condition.union?.value,
                    link: condition.link?.value
                })),
                awards: task.awards.map(award => ({
                    award: award.award.value,
                    quantity: +form[`task_${task.id}`][`award_${award.id}`]?.value
                })),
            })),
            awards
        }
    }

    useEffect(() => {
        const options = {
            isSource: (isSource?.length > 0),
            status
        }
        if (successor) options.successor = successor.value
        if (edit) options.id = document._id
        setVariables((vars) => ({
            ...vars,
            ...options
        }))
    }, [status, successor, isSource, edit, document])

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? ADD_ACT : EDIT_ACT}
            variables={variables}
            beforeEffect={(form, options) => variablesCompose(form, options)}
            afterEffect={close}
        >
            {({ register, loading }) => (
                <React.Fragment>
                    <p className="ui-title">General</p>
                    <Input options={{
                        ref: register({ required: 'Title is required' }),
                        type: 'text',
                        name: 'title',
                        defaultValue: document?.title || '',
                        placeholder: 'Enter title',
                        disabled: loading
                    }} />

                    <Input options={{
                        ref: register({ required: 'Description is required' }),
                        type: 'text',
                        name: 'description',
                        defaultValue: document?.description || '',
                        placeholder: 'Enter description',
                        disabled: loading
                    }} />

                    <Divider />
                    <p className="ui-title">Tasks</p>
                    <ActTasks register={register} tasks={tasks} setTasks={setTasks} />

                    <Divider />
                    <p className="ui-title">Awards</p>
                    <ActAwards register={register} actAwards={actAwards} setActAwards={setActAwards}/>

                    <Divider />
                    <p className="ui-title">Settings</p>
                    <ActSettings options={{
                        isEnableSuccessor,
                        successor,
                        status: status,
                        isSource,
                        isStatus: editableStatus,
                        setSuccessor,
                        setEnabledSuccessor,
                        setSource,
                        setStatus: setStatus
                    }} />
                </React.Fragment>
            )}
        </Form>
    )
}