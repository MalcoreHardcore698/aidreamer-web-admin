import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import List from '../ui/List'
import { GET_ALL_FLAGS, EDIT_LANGUAGE } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ language, close }) => {
    const [action, { loading }] = useMutation(EDIT_LANGUAGE)

    const [flag, setFlag] = useState(language.flag)

    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async (form) => {
        const variables = {
            id: language._id,
            code: form.code,
            title: form.title,
            flag: flag.id
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            {(errors.code) && <Alert type="error" message={
                (errors.code.message)
            } />}

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'code',
                value: language.code,
                disabled: loading,
                placeholder: 'Enter code'
            }} />

            <Input options={{
                ref: register({ required: true }),
                type: 'text',
                name: 'title',
                value: language.title,
                disabled: loading,
                placeholder: 'Enter title'
            }} />

            <Query query={GET_ALL_FLAGS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <List options={{
                        type: 'grid',
                        state: flag,
                        list: data.allFlags,
                        handlerItem: setFlag
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

            <Button options={{
                type: 'submit',
                state: 'inactive',
                classNames: 'grow'
            }}>
                <p>Save</p>
            </Button>
        </form>
    )
}