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