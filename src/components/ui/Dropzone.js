import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import Dropzone from 'react-dropzone-uploader'
import { config } from '../../utils/config'
import '../styles/Dropzone.css'

const api = config.get('api')

export default ({ options }) => {
    const [preview, setPreview] = useState('')

    const {
        ref,
        type,
        name,
        value,
        styles={},
        setImage
    } = options || {}

    const classes = [
        'ui-dropzone', type,
        (preview || value) ? ' with-preview' : ''
    ]

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === 'done') {
            setPreview(meta.previewUrl)
            setImage(file)
        }
    }

    return (
        <div className={classes.join(' ')} styles={styles}>
            {(preview || value) && <div className="preview">
                {(preview) ?
                    <img src={preview} alt="Preview" />
                : (value) ?
                   <img
                        className="image"
                        src={(value).replace('./', `${api}/`)}
                        alt="Article"
                    />
                : <FontAwesomeIcon icon={faImage} />}
            </div>}

            <Dropzone
                ref={ref}
                name={name}
                maxFiles={1}
                multiple={false}
                onChangeStatus={handleChangeStatus}
                inputContent="Drag & Drop Image"
                accept="image/*"
            />
        </div>
    )
}