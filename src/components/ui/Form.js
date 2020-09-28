import React, { useState, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '../ui/Button'

export default ({
    query,
    wide=false,
    add=false,
    edit=false,
    children,
    variables,
    afterEffect
}) => {
    const formRef = useRef(null)
    const FormFields = children

    const [action, { loading }] = useMutation(query)
    const [disabledSubmit, setDisabledSubmit] = useState(true)

    const methods = useForm()

    const onSubmit = async (form) => {
        await action({ variables: variables(form) })
        if (afterEffect) afterEffect()
    }

    return (
        <FormProvider {...methods}>
            <form ref={formRef} className={`ui-form${(wide) ? ' wide' : ''}`} onSubmit={methods.handleSubmit(onSubmit)}>
                <FormFields {...methods} elevate={() => setDisabledSubmit(false)} loading={loading} />

                <Button options={{
                    type: 'submit',
                    state: 'inactive',
                    disabled: !disabledSubmit,
                    classNames: 'grow'
                }}>
                    <p>{(add) ? 'Add' : 'Save Changes'}</p>
                </Button>
            </form>
        </FormProvider>
    )
}