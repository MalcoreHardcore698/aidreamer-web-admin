import React, { useState } from 'react'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { REGISTER } from '../../utils/queries'

export default ({ close }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    // eslint-disable-next-line
    const [avatar, setAvatar] = useState('')
    const [role, setRole] = useState('')

    return (
        <Container type="fat">
            <Input options={{
                type: 'text',
                placeholder: 'Enter name',
                onChange: (e) => {
                    setName(e.target.value)
                }
            }} />

            <Input options={{
                type: 'number',
                placeholder: 'Enter phone',
                onChange: (e) => {
                    setPhone(e.target.value)
                }
            }} />

            <Input options={{
                type: 'password',
                placeholder: 'Enter password',
                onChange: (e) => {
                    setPassword(e.target.value)
                }
            }} />

            <Input options={{
                type: 'password',
                placeholder: 'Enter confirm password',
                onChange: (e) => {
                    setConfirmPassword(e.target.value)
                }
            }} />

            <Input options={{
                type: 'email',
                placeholder: 'Enter email',
                onChange: (e) => {
                    setEmail(e.target.value)
                }
            }} />

            <Select options={{
                options: [
                    { value: 'USER', label: 'USER' },
                    { value: 'MODERATOR', label: 'MODERATOR' },
                    { value: 'ADMINISTRATOR', label: 'ADMINISTRATOR' }
                ],
                onChange: (e) => {
                    setRole(e.value)
                }
            }} />

            <Mutation query={REGISTER}>
                {({ action }) => (
                    <Button options={{
                        type: 'inactive',
                        handler: async () => {
                            const variables = {
                                name, password, confirmPassword,
                                email, phone, role
                            }

                            if (avatar) variables.avatar = avatar

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