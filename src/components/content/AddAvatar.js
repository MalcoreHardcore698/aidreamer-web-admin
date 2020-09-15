import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Button from '../ui/Button'
import HubToggler from '../ui/HubToggler'
import Toggler from '../ui/Toggler'
import Dropzone from '../ui/Dropzone'
import { GET_ALL_RARITIES, ADD_AVATAR } from '../../utils/queries'

export default ({ close }) => {
    const [action] = useMutation(ADD_AVATAR)

    const[hub, setHub] = useState({})
    const[image, setImage] = useState(null)
    const[rarity, setRarity] = useState(null)

    const { handleSubmit, register } = useForm()
    const onSubmit = async () => {
        if (!hub) return null

        const variables = {
            rarity,
            file: image,
            hub: hub.id
        }

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
                <p>Add</p>
            </Button>
        </form>
    )
}