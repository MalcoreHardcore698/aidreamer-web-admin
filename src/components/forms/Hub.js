import React from 'react'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Form from '../ui/Form'
import Input from '../ui/Input'
import List from '../ui/List'
import TextArea from '../ui/TextArea'
import Message from '../ui/Message'
import Toggler from '../ui/Toggler'
import { GET_ALL_STATUS, GET_ALL_ICONS, ADD_HUB, EDIT_HUB } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({
    document,
    close,
    add=false,
    edit=false,
    isTitle,
    isDescription,
    isSlogan,
    isColor,
    isIcon,
    isStatus
}) => {
    const variablesCompose = (form) => {
        const variables = {
            title: form.title,
            status: form.status || 'PUBLISHED'
        }

        if (edit) variables.id = document._id
        if (form.description) variables.description = form.description
        if (form.slogan) variables.slogan = form.slogan
        if (form.color) variables.color = form.color

        return variables
    }

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? ADD_HUB : EDIT_HUB}
            variables={(form, options) => variablesCompose(form, options)}
            afterEffect={close}
        >
            {({ register, loading, setValue }) => (
                <React.Fragment>
                    {(isTitle) && <Input options={{
                        type: 'text',
                        name: 'title',
                        inputRef: register({ required: true }),
                        defaultValue: document?.title || '',
                        placeholder: 'Enter title',
                        disabled: loading
                    }} />}
                    
                    {(isDescription) && <TextArea options={{
                        type: 'text',
                        name: 'description',
                        inputRef: register({ required: true }),
                        defaultValue: document?.description || '',
                        placeholder: 'Enter description',
                        disabled: loading
                    }} />}

                    {(isSlogan) && <Input options={{
                        type: 'text',
                        name: 'slogan',
                        inputRef: register({ required: true }),
                        defaultValue: document?.slogan || '',
                        placeholder: 'Enter slogan',
                        disabled: loading
                    }} />}

                    {(isColor) && <Input options={{
                        type: 'color',
                        name: 'color',
                        inputRef: register({ required: true }),
                        defaultValue: document?.color || '',
                        placeholder: 'Enter color',
                        disabled: loading
                    }} />}

                    {(isIcon) && <Query query={GET_ALL_ICONS} pseudo={{ count: 1, height: 45 }}>
                        {({ data }) => {
                            const icons = data.allIcons

                            if (icons.length === 0)
                                return <Message text="No icons found" padding />

                            return (
                                <List options={{
                                    type: 'grid',
                                    name: 'status', setValue,
                                    register: register(),
                                    list: data.allIcons
                                }}>
                                    {({ item }) => (
                                        <img
                                            className="image"
                                            src={(item.path).replace('./', `${api}/`)}
                                            alt="Hub"
                                        />
                                    )}
                                </List>
                            )
                        }}
                    </Query>}

                    {(isStatus) && <Query query={GET_ALL_STATUS}>
                        {({ data }) => (
                            <Toggler options={{
                                name: 'status', setValue,
                                register: register(),
                                initialSlicedFactor: 2,
                                initialOptions: data.allStatus.map((status, index) => ({
                                    value: status,
                                    label: (
                                        <Row key={index}>
                                            <p>{status}</p>
                                        </Row>
                                    )
                                }))
                            }}/>
                        )}
                    </Query>}
                </React.Fragment>
            )}
        </Form>
    )
}