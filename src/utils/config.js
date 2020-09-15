const isDev = process.env.NODE_ENV === 'development'

export const config = {
    proxy: {
        api: 'http://api.aidreamer.com',
        apiWs: 'ws://api.aidreamer.com'
    },
    get: (key) => {
        return config.proxy[key]
    }
}