import React, { useState } from 'react'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import Select from '../ui/Select'
import Dropzone from '../ui/Dropzone'
import { EDIT_NEWS } from '../../utils/queries'

export default ({ news, hideModal }) => {
    const [title, setTitle] = useState(news.title)
    const [description, setDescription] = useState(news.description)
    const [body, setBody] = useState(news.body)
    const [hub, setHub] = useState(news.hub)
    const [image, setImage] = useState('')

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
            <TextArea options={{
                value: body,
                placeholder: 'Enter body',
                onChange: (e) => {
                    setBody(e.target.value)
                }
            }} />

            <Select options={{
                options: [{ value: '5f4ac735742b1043bc459b55', label: 'Valorant' }],
                onChange: (e) => {
                    setHub(e.value)
                }
            }} />

            <Dropzone options={{
                name: 'image',
                image, setImage
            }} />

            <Mutation query={EDIT_NEWS}>
                {({ action }) => (
                    <Button options={{
                        type: 'inactive',
                        handler: async () => {
                            const variables = {
                                id: news.id,
                                title, description,
                                body, hub
                            }

                            if (image) {
                                variables.image = image
                            }

                            console.log(variables)

                            await action({ variables })

                            hideModal()
                        }
                    }}>
                        <p>Apply</p>
                    </Button>
                )}
            </Mutation>
        </Container>
    )
}