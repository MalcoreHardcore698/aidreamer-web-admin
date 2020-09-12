import React, { useState } from 'react'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { ADD_HUB } from '../../utils/queries'

export default ({ status=false, close }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [slogan, setSlogan] = useState('')
    const [color, setColor] = useState('')
    // eslint-disable-next-line
    const [icon, setIcon] = useState('')
    const [_status, _setStatus] = useState('')

    return (
        <Container type="fat">
            <Input options={{
                type: 'text',
                placeholder: 'Enter title',
                onChange: (e) => {
                    setTitle(e.target.value)
                }
            }} />

            <Input options={{
                type: 'text',
                placeholder: 'Enter description',
                onChange: (e) => {
                    setDescription(e.target.value)
                }
            }} />

            <Input options={{
                placeholder: 'Enter slogan',
                onChange: (e) => {
                    setSlogan(e.target.value)
                }
            }} />

            <Input options={{
                type: 'color',
                placeholder: 'Choose color',
                onChange: (e) => {
                    setColor(e.target.value)
                }
            }} />

            {(status) && <Select options={{
                placeholder: 'Choose status',
                options: [
                    { value: 'MODERATION', label: 'MODERATION' },
                    { value: 'PUBLISHED', label: 'PUBLISHED' }
                ],
                onChange: (e) => {
                    _setStatus(e.value)
                }
            }} />}

            <Mutation query={ADD_HUB}>
                {({ action }) => (
                    <Button options={{
                        state: 'inactive',
                        handler: async () => {
                            const variables = {
                                title, description, slogan,
                                color, status: 'PUBLISHED'
                            }

                            // if (icon) variables.icon = icon
                            if (status) variables.status = _status

                            await action({ variables })

                            close()
                        }
                    }}>
                        <p>Add</p>
                    </Button>
                )}
            </Mutation>
        </Container>
    )
}