import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

export const useRequest = () => {
    const [_loading, setLoading] = useState(false)
    const [_error, setError] = useState(false)

    const request = async (query, variables) => {
        const { data, loading, error } = useQuery(query, { variables })

        useEffect(() => {
            setLoading(loading)
        }, [error])

        useEffect(() => {
            setError(error)
        }, [error])

        return await data
    }

    return {
        request,
        loading: _loading,
        error: _error
    }
}