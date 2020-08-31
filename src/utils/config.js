export const config = {
    proxy: {
        api: 'http://localhost:5000',
        apiWs: 'ws://localhost:5000',
    },
    get: (key) => {
        return config.proxy[key]
    }
}