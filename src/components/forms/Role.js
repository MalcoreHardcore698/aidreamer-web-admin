import React, { useState, useEffect } from 'react'
import Query from '../ui/Query'
import Form from '../ui/Form'
import Select from '../ui/Select'
import Input from '../ui/Input'
import { GET_ALL_PERMITIONS, ADD_ROLE, EDIT_ROLE } from '../../utils/queries'

export default ({
    document,
    close,
    add=false,
    edit=false
}) => {
    const [variables, setVariables] = useState({})

    const [permissions, setPermissions] = useState(document?.permissions?.map(p => ({
        value: p, label: p
    })))

    const variablesCompose = (form, options) => {
        return {
            ...options,
            name: form.name
        }
    }

    useEffect(() => {
        const options = {
            permissions: permissions.map(p => p.value)
        }
        if (edit) options.id = document._id
        setVariables((vars) => ({
            ...vars,
            ...options
        }))
    }, [permissions, edit, document])

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? ADD_ROLE : EDIT_ROLE}
            variables={variables}
            beforeEffect={(form, options) => variablesCompose(form, options)}
            afterEffect={close}
        >
            {({ elevate, register, loading }) => (
                <React.Fragment>
                    <Input options={{
                        ref: register({ required: true }),
                        type: 'text',
                        name: 'name',
                        defaultValue: document.name,
                        placeholder: 'Enter name',
                        disabled: loading
                    }} />

                    <Query query={GET_ALL_PERMITIONS} pseudo={{ count: 1, height: 45 }}>
                        {({ data }) => (
                            <Select options={{
                                value: permissions,
                                options: data.allPermissions.map(p => ({
                                    value: p,
                                    label: p
                                })),
                                closeMenuOnSelect: false,
                                isMulti: true,
                                onChange: (e) => {
                                    setPermissions(e)
                                    elevate()
                                }
                            }} />
                        )}
                    </Query>
                </React.Fragment>
            )}
        </Form>
    )
}