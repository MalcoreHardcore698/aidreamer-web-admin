import React, { useEffect } from 'react'
import { useSubscription } from '@apollo/react-hooks'

export default (props) => {
    const { data } = useSubscription(
        props.query,
        { variables: props.variables }
    )

    const Children = props.children

    useEffect(() => {
        if (props.refetch) props.refetch()
    }, [data, props])

    return <Children subData={data} />
}