import React, { useState, useEffect } from 'react'
import Form from '../ui/Form'
import Dropzone from '../ui/Dropzone'
import { ADD_IMAGE, EDIT_IMAGE } from '../../utils/queries'

export default ({
    document,
    close,
    add=false,
    edit=false
}) => {
    const [variables, setVariables] = useState({})

    const[image, setImage] = useState(document?.image)

    useEffect(() => {
        const options = {
            image
        }
        if (edit) options.id = document._id
        setVariables((vars) => ({
            ...vars,
            ...options
        }))
    }, [image, edit, document])

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? ADD_IMAGE : EDIT_IMAGE}
            variables={variables}
            afterEffect={close}
        >
            {({ elevate, register }) => (
                <React.Fragment>
                    <Dropzone options={{
                        ref: register,
                        name: 'image',
                        value: image.path,
                        setImage: (file) => {
                            setImage(file)
                            elevate()
                        }
                    }} />
                </React.Fragment>
            )}
        </Form>
    )
}