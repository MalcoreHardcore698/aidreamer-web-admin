import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import Row from '../ui/Row'
import Query from '../ui/Query'
import Button from '../ui/Button'
import Toggler from '../ui/Toggler'
import Dropzone from '../ui/Dropzone'
import { GET_ALL_HUBS, ADD_ICON } from '../../utils/queries'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ close }) => {
    const [action] = useMutation(ADD_ICON)

    const[hub, setHub] = useState(null)
    const[image, setImage] = useState(null)

    const { handleSubmit, register } = useForm()
    const onSubmit = async () => {
        if (!hub) return null

        const variables = {
            file: image,
            hub
        }

        await action({ variables })

        close()
    }

    return (
        <form className="fat" onSubmit={handleSubmit(onSubmit)}>
            <Dropzone options={{
                ref: register,
                name: 'image',
                setImage
            }} />

            <Query query={GET_ALL_HUBS} pseudo={{ count: 1, height: 45 }}>
                {({ data }) => (
                    <Toggler options={{
                        type: 'auto',
                        state: hub,
                        handler: setHub,
                        targets: (data && data.allHubs).map((hub, key) => ({
                            type: hub.id,
                            value: (
                                <Row key={key}>
                                    {(hub.icon && hub.icon.path) &&
                                    <div className="icon">
                                        <img src={(hub.icon.path).replace('./', `${api}/`)} alt={hub.title} />
                                    </div>}
                                    <p>{hub.title}</p>
                                </Row>
                            )}))
                        }}
                    />
                )}
            </Query>

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