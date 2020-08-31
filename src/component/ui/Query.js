import React from 'react'
import { useQuery } from '@apollo/react-hooks'

export default (props) => {
    const { data, loading, error, refetch } = useQuery(
        props.query,
        { variables: props.variables }
    )

    const Children = props.children

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    return <Children data={data} refetch={refetch} />
}