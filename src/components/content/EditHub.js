import React, { useState } from 'react'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { EDIT_HUB } from '../../utils/queries'

export default ({ status=false, hub, close }) => {
    const [title, setTitle] = useState(hub.title)
    const [description, setDescription] = useState(hub.description)
    const [slogan, setSlogan] = useState(hub.slogan)
    const [color, setColor] = useState(hub.color)
    const [icon, setIcon] = useState(hub.icon)
    const [_status, _setStatus] = useState(hub.status)

    return (
        <Container>
            <Input options={{
                type: 'text',
                value: title,
                placeholder: 'Enter title',
                onChange: (e) => {
                    setTitle(e.target.value)
                }
            }} />
            <Input options={{
                type: 'text',
                value: description,
                placeholder: 'Enter description',
                onChange: (e) => {
                    setDescription(e.target.value)
                }
            }} />
            <Input options={{
                value: slogan,
                placeholder: 'Enter slogan',
                onChange: (e) => {
                    setSlogan(e.target.value)
                }
            }} />

            <Input options={{
                type: 'color',
                value: color,
                placeholder: 'Choose color',
                onChange: (e) => {
                    setColor(e.target.value)
                }
            }} />

            {(status) && <Select options={{
                defaultValue: { value: _status, label: _status },
                options: [
                    { value: 'MODERATION', label: 'MODERATION' },
                    { value: 'PUBLISHED', label: 'PUBLISHED' }
                ],
                onChange: (e) => {
                    _setStatus(e.value)
                }
            }} />}

            <Mutation query={EDIT_HUB}>
                {({ action }) => (
                    <Button options={{
                        type: 'inactive',
                        handler: async () => {
                            const variables = {
                                id: hub.id,
                                title, description, slogan,
                                status: 'PUBLISHED'
                            }

                            if (icon) variables.icon = icon
                            if (status) variables.status = _status

                            await action({ variables })

                            close()
                        }
                    }}>
                        <p>Apply</p>
                    </Button>
                )}
            </Mutation>
        </Container>
    )
}