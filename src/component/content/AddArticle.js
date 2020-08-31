import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import Select from '../ui/Select'
import Dropzone from '../ui/Dropzone'
import { ADD_NEWS } from '../../utils/queries'

export default ({ hideModal }) => {
    const state = useSelector(state => state)
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [hub, setHub] = useState('')
    const [image, setImage] = useState('')

    return (
        <Container>
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
            <TextArea options={{
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

            <Mutation query={ADD_NEWS}>
                {({ action }) => (
                    <Button options={{
                        type: 'inactive',
                        handler: async () => {
                            const variables = {
                                author: state.user.id,
                                title, description, body,
                                hub, status: 'PUBLISHED'
                            }

                            if (image) {
                                variables.image = image
                            }

                            await action({ variables })

                            hideModal()
                        }
                    }}>
                        <p>Add</p>
                    </Button>
                )}
            </Mutation>
        </Container>
    )
}