import React, { useState, useEffect } from 'react'
import Query from '../ui/Query'
import Form from '../ui/Form'
import Input from '../ui/Input'
import List from '../ui/List'
import { GET_ALL_ICONS, ADD_LANGUAGE, EDIT_LANGUAGE } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({
    document,
    close,
    add=false,
    edit=false
}) => {
    const [variables, setVariables] = useState({})

    const [flag, setFlag] = useState(document?.flag)
    
    const variablesCompose = (form, options) => {
        return {
            ...options,
            ...variables,
            code: form.code,
            title: form.title
        }
    }

    useEffect(() => {
        const options = {
            flag: flag.id
        }
        if (edit) options.id = document._id
        setVariables((vars) => ({
            ...vars,
            ...options
        }))
    }, [flag, edit, document])

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? ADD_LANGUAGE : EDIT_LANGUAGE}
            variables={variables}
            beforeEffect={(form, options) => variablesCompose(form, options)}
            afterEffect={close}
        >
            {({ elevate, register, loading }) => (
                <React.Fragment>
                    <Input options={{
                        ref: register({ required: true }),
                        type: 'text',
                        name: 'code',
                        value: document.code,
                        placeholder: 'Enter code',
                        disabled: loading
                    }} />

                    <Input options={{
                        ref: register({ required: true }),
                        type: 'text',
                        name: 'title',
                        value: document.title,
                        placeholder: 'Enter title',
                        disabled: loading
                    }} />

                    <Query query={GET_ALL_ICONS} variables={{ type: 'FLAG' }} pseudo={{ count: 1, height: 45 }}>
                        {({ data }) => (
                            <List options={{
                                type: 'grid',
                                state: flag,
                                list: data.allFlags,
                                handlerItem: (item) => {
                                    setFlag(item)
                                    elevate()
                                }
                            }}>
                                {({ item }) => (
                                    <img
                                        className="image"
                                        src={(item.path).replace('./', `${api}/`)}
                                        alt="Flag"
                                    />
                                )}
                            </List>
                        )}
                    </Query>
                </React.Fragment>
            )}
        </Form>
    )
}