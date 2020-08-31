import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import Dropzone from 'react-dropzone-uploader'
import '../styles/Dropzone.css'

export default ({ options }) => {
    const [preview, setPreview] = useState('')

    const {
        name,
        value,
        styles={},
        setImage
    } = options || {}

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === 'done') {
            setPreview(meta.previewUrl)
            setImage(file)
        }
    }

    return (
        <div className="ui-dropzone" styles={styles}>
            {(preview && value) && <div className="preview">
                {(preview) ?
                    <img src={preview} alt="Preview" />
                :(value && value.includes('blob')) ?
                    <img src={value} alt={name} />
                : (value) ?
                    <img src={`http://localhost:5000${value.replace('./', '/')}`} alt={name} />
                : <FontAwesomeIcon icon={faImage} />}
            </div>}

            <Dropzone
                maxFiles={1}
                multiple={false}
                onChangeStatus={handleChangeStatus}
                inputContent="Drag & Drop Image"
                accept="image/*"
            />
        </div>
    )
}