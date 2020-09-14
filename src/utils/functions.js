const isDev = process.env.NODE_ENV === 'development'

export function parseLink(str) {
    return str.toLowerCase().replace(' ', '-')
}

export function getPage(data, limit, page) {
    const start = (page * limit)
    const end = (start + limit)

    return data.slice(start, end)
}

export function getMaxPage(data, limit) {
    let arr = data
    let maxPage = 0
    while (arr.length > 0) {
        arr = arr.slice(limit)
        maxPage += 1
    }

    return (maxPage - 1)
}

export function setCookie(name, value, expiresDays=30) {
    const date = new Date()
    date.setTime(date.getTime() + (expiresDays * 24*60*60*1000))
    const expires = "expires="+ date.toUTCString()
    const domain = (isDev) ? '' : 'domain=.aidreamer.com;'

    document.cookie = `${name}=${JSON.stringify(value)};${expires};${domain}path=/`
}

export function getCookie(cname) {
    const name = cname + "="
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')

    for(var i = 0; i < ca.length; i++) {
        let c = ca[i]

        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

export function clearCookie(name) {
    const domain = (isDev) ? '' : 'domain=.aidreamer.com;'
    document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:00 GMT; ${domain}`;
}