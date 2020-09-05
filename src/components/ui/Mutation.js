import React from 'react'
import { useMutation } from '@apollo/react-hooks'

export default (props) => {
    const [action, { data, loading, error }] = useMutation(props.query)

    const Children = props.children

    return <Children error={error} data={data} loading={loading} action={action} />
}