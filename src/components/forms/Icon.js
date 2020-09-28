import React, { useState, useEffect } from 'react'
import Row from '../ui/Row'
import Query from '../ui/Query'
import Form from '../ui/Form'
import Toggler from '../ui/Toggler'
import Dropzone from '../ui/Dropzone'
import { GET_ALL_ICON_TYPES, ADD_ICON, EDIT_ICON } from '../../utils/queries'

export default ({
    icon,
    close,
    add=false,
    edit=false
}) => {
    const [variables, setVariables] = useState({})

    const [iconType, setIconType] = useState(icon?.type)
    const [image, setImage] = useState(icon?.image)

    useEffect(() => {
        const options = {
            file: image,
            type: iconType
        }
        if (edit) options.id = icon._id
        setVariables((vars) => ({
            ...vars,
            ...options
        }))
    }, [image, iconType, edit, icon])

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? ADD_ICON : EDIT_ICON}
            variables={variables}
            afterEffect={close}
        >
            {({ elevate, register }) => (
                <React.Fragment>
                    <p className="ui-title">Image</p>
                    <Dropzone options={{
                        ref: register,
                        name: 'image',
                        value: icon.path,
                        setImage: (file) => {
                            setImage(file)
                            elevate()
                        }
                    }} />

                    <p className="ui-title">Type</p>
                    <Query query={GET_ALL_ICON_TYPES}>
                        {({ data }) => (
                            <Toggler options={{
                                state: iconType,
                                handler: (item) => {
                                    setIconType(item)
                                    elevate()
                                },
                                targets: [
                                    ...data.allIconTypes.map((item, key) => ({
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
                </React.Fragment>
            )}
        </Form>
    )
}