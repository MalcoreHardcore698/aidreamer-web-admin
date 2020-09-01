import React, { useState } from 'react'
import Mutation from '../ui/Mutation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { EDIT_USER } from '../../utils/queries'

export default ({ user, close }) => {
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)
    const [password, setPassword] = useState(user.password)
    const [confirmPassword, setConfirmPassword] = useState(user.password)
    const [email, setEmail] = useState(user.email)
    // eslint-disable-next-line
    const [avatar, setAvatar] = useState('')
    const [role, setRole] = useState(user.role)

    return (
        <Container>
            <Input options={{
                type: 'text',
                value: name,
                placeholder: 'Enter name',
                onChange: (e) => {
                    setName(e.target.value)
                }
            }} />

            <Input options={{
                type: 'number',
                value: phone,
                placeholder: 'Enter phone',
                onChange: (e) => {
                    setPhone(e.target.value)
                }
            }} />

            <Input options={{
                type: 'password',
                value: confirmPassword,
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
                value: email,
                placeholder: 'Enter email',
                onChange: (e) => {
                    setEmail(e.target.value)
                }
            }} />

            <Select options={{
                defaultValue: { value: role, label: role },
                options: [
                    { value: 'USER', label: 'USER' },
                    { value: 'MODERATOR', label: 'MODERATOR' },
                    { value: 'ADMINISTRATOR', label: 'ADMINISTRATOR' }
                ],
                onChange: (e) => {
                    setRole(e.value)
                }
            }} />

            <Mutation query={EDIT_USER}>
                {({ action }) => (
                    <Button options={{
                        type: 'inactive',
                        handler: async () => {
                            const variables = {
                                id: user.id,
                                name, password, email
                            }

                            if (avatar) variables.avatar = avatar

                            await action({ variables })

                            if (close) close()
                        }
                    }}>
                        <p>Apply</p>
                    </Button>
                )}
            </Mutation>
        </Container>
    )
}