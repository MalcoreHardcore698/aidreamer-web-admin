import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faImage,
    faTrash,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Container from '../ui/Container'
import List from '../ui/List'
import Message from '../ui/Message'
import Alert from '../ui/Alert'
import Select from '../ui/Select'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Dropdown from '../ui/Dropdown'
import Checkbox from '../ui/Checkbox'
import Divider from '../ui/Divider'
import {
    ADD_ACT,
    GET_ALL_ICONS,
    GET_ALL_AWARDS,
    GET_ALL_CONDITION_ENUMS,
    GET_ALL_USERS,
    GET_ALL_ARTICLES,
    GET_ALL_OFFERS,
    GET_ALL_HUBS
} from '../../utils/queries'
import { config } from '../../utils/config'
import { v4 } from 'uuid'

const api = config.get('api')

const AREAS_QUERIES = {
    'USER': GET_ALL_USERS,
    'ARTICLE': GET_ALL_ARTICLES,
    'OFFER': GET_ALL_OFFERS,
    'HUB': GET_ALL_HUBS
}

const SpecificSelect = ({ i, j, task, condition, setTasks }) => {
    return (
        <Query query={AREAS_QUERIES[condition.specific.area.value]} pseudo={{ count: 1, height: 45 }}>
            {({ data }) => {
                return (
                    <Select options={{
                        name: `[task_${task.id || i}][condition_${condition.id || j}][area]`,
                        value: condition.specific.object,
                        placeholder: 'Choose object',
                        options: data[Object.keys(data)[0]].map(obj => ({
                            value: obj,
                            label: obj.title
                        })),
                        onChange: (e) => {
                            setTasks(prev => prev.map((_task, _i) =>
                                ((_task.id || _i) === (task.id || i)) ? ({
                                    ..._task,
                                    condition: _task.condition.map((_condition, _j) =>
                                        ((_condition.id || _j) === (condition.id || j)) ? ({
                                            ..._condition,
                                            specific: {
                                                ..._condition.specific,
                                                object: e
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

export default ({ close }) => {
    const [action, { loading }] = useMutation(ADD_ACT)
    const [tasks, setTasks] = useState([])
    const [actAwards, setActAwards] = useState([])

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        console.log(tasks)
        const variables = {
            title: form.title,
            description: form.description,
            tasks, awards: actAwards,
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            <p className="ui-title">General</p>
            {(errors.title || errors.description) && <Alert type="error" message={
                errors.title.message || errors.description.message
            } />}

            <Input options={{
                ref: register({ required: 'Title is required' }),
                type: 'text',
                name: 'title',
                disabled: loading,
                placeholder: 'Enter title'
            }} />

            <Input options={{
                ref: register({ required: 'Description is required' }),
                type: 'text',
                name: 'description',
                disabled: loading,
                placeholder: 'Enter description'
            }} />

            <Divider />
            <p className="ui-title">Tasks</p>
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
                                        icon: null,
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
                                                    {(task.icon) ? (
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
                                    name: 'title',
                                    defaultValue: task.title || '',
                                    disabled: loading,
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
                                                    specific: null,
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
                                                        {((condition.goals?.length > 0) && condition.goals.find(g => g.value.includes('QUANTITY')) && (
                                                            <Input options={{
                                                                ref: register({ required: 'Multiply is required' }),
                                                                type: 'number',
                                                                name: `[task_${task.id}][condition_${condition.id}][multiply]`,
                                                                placeholder: 'Enter multiply'
                                                            }} />
                                                        ))}
                                                        {((condition.goals?.length > 0) && condition.goals.find(g => g.value.includes('SPECIFIC')) && (
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

                            <div className="awards">
                                <Button options={{
                                    state: 'inactive',
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
                                    {(task.awards.length > 0) ? 
                                        <Query query={GET_ALL_AWARDS} pseudo={{ count: 1, height: 45 }}>
                                            {({ data }) => (
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
                                                                options: data.allAwardTypes.map(p => ({
                                                                    value: p,
                                                                    label: p
                                                                })),
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
                                                                ref: register({ required: 'Value is required' }),
                                                                type: 'number',
                                                                name: `[task_${task.id}][award_${award.id}][value]`,
                                                                placeholder: 'Value'
                                                            }} />
                                                        </div>
                                                    </li>
                                                ))
                                            )}
                                        </Query>
                                    : <Message text="No Awards" padding />}
                                </ul>
                            </div>
                        </li>
                    )) : <Message text="No Tasks" padding />}
                </ul>
            </div>

            <p className="ui-title">Awards</p>
            <div className="ui-awards">
                <div className="manage">
                    <Button options={{
                        state: 'inactive',
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
                    {(actAwards.length > 0) ? 
                        <Query query={GET_ALL_AWARDS} pseudo={{ count: 1, height: 45 }}>
                            {({ data }) => (
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
                                                options: data.allAwardTypes.map(p => ({
                                                    value: p,
                                                    label: p
                                                })),
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
                                                ref: register({ required: 'Value is required' }),
                                                type: 'number',
                                                name: `[act][award_${actAward.id}][value]`,
                                                placeholder: 'Value'
                                            }} />
                                        </div>
                                    </li>
                                ))
                            )}
                        </Query>
                    : <Message text="No Act Awards" padding />}
                </ul>
            </div>

            <Divider />
            <Button options={{
                type: 'submit',
                state: 'inactive',
                classNames: 'grow'
            }}>
                <p>Add</p>
            </Button>
        </form>
    )
}