import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Skeleton from './Skeleton'
import Message from './Message'
import Row from './Row'

export default (props) => {
    const { data, loading, error, refetch } = useQuery(
        props.query,
        { variables: props.variables }
    )

    const Children = props.children
    const pseudo = props.pseudo

    const options = {
        height: `${pseudo?.height || 256}px`,
        widthRandomness: 0,
        heightRandomness: 0
    }

    const renderSkeleton = () => {
        const skeletons = []

        for (let i = 0; i < (pseudo?.count || 1); i++) {
            skeletons.push(<Skeleton key={i} options={options} />)
        }

        return skeletons.map(skeleton => skeleton)
    }

    if (loading || !data) return (
        <Row type="flex loader" style={{ gridColumn: '1 / 5' }}>
            {renderSkeleton()}
        </Row>
    )
    if (error) return <Message text={error} padding />

    return (
        <Children data={data} refetch={refetch} />
    )
}