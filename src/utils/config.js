const isDev = process.env.NODE_ENV === 'development'

export const config = {
    proxy: {
        api: (isDev) ? 'http://localhost:8000' : 'http://api.aidreamer.com',
        apiWs: (isDev) ? 'ws://localhost:8000' : 'ws://api.aidreamer.com'
    },
    get: (key) => {
        return config.proxy[key]
    }
}