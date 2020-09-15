import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Button from '../ui/Button'
import HubToggler from '../ui/HubToggler'
import Toggler from '../ui/Toggler'
import Dropzone from '../ui/Dropzone'
import { GET_ALL_RARITIES, EDIT_AVATAR } from '../../utils/queries'

export default ({ avatar, close }) => {
    const [action] = useMutation(EDIT_AVATAR)

    const[hub, setHub] = useState(avatar.hub)
    const[image, setImage] = useState(null)
    const[rarity, setRarity] = useState(avatar.rarity)

    const { handleSubmit, register } = useForm()
    const onSubmit = async () => {
        const variables = {
            id: avatar._id,
            rarity: rarity,
            hub: hub.id
        }

        if (image) variables.file = image

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            <p className="ui-title">Image</p>
            <Dropzone options={{
                ref: register,
                type: 'icon',
                name: 'image',
                value: avatar.path,
                setImage
            }} />

            <p className="ui-title">Rarity</p>
            <Query query={GET_ALL_RARITIES}>
                {({ data }) => (
                    <Toggler options={{
                        state: rarity,
                        handler: setRarity,
                        targets: [
                            ...data.allRarities.map((item, key) => ({
                                type: item,
                                value: (
                                    <Row key={key}>
                                        <p>{item}</p>
                                    </Row>
                                )}))
                        ]}}
                    />
                )}
            </Query>
            
            <p className="ui-title">Hub</p>
            <HubToggler override={{
                state: hub,
                handler: setHub
            }} />

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