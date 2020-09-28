import React, { useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import '../styles/Dropzone.css'
import { useFormContext } from 'react-hook-form'

export default ({ options }) => {
    const {
        type,
        name,
        accept
    } = options

    const {
        register,
        unregister,
        setValue,
        watch
    } = useFormContext()

    const file = watch(name)

    const onDrop = useCallback(
        (droppedFile) => {
            const file = droppedFile[0]
            setValue(name, file)
        },
        [setValue, name],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        maxFiles: 1,
        accept
    })

    const classes = [
    'ui-dropzone', type
    ]

    useEffect(() => {
        register(name)
        return () => {
            unregister(name)
        }
    }, [register, unregister, name])

  return (
    <div className={classes.join(' ')}>
        <div className="dropzone-container" {...getRootProps()}>
            <input
                id={name}
                name={name}
                accept={accept}
                {...getInputProps()}
            />
            <div className={`dropzone-area${(isDragActive ? ' active' : '')}`}>
                <p>Drop Image</p>

                {!!file && (
                    <div className="preview">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}