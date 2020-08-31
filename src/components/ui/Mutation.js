import React from 'react'
import { useMutation } from '@apollo/react-hooks'

export default (props) => {
    const [action, { data, loading, error }] = useMutation(props.query)

    const Children = props.children

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    return <Children data={data} action={action} />
}