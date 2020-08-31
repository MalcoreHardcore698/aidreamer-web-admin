import C from './types'

export function setUser(user) {
    return {
        type: C.SET_USER,
        payload: {
            user
        }
    }
}

export function addChat(chatId) {
    return {
        type: C.ADD_CHAT,
        payload: {
            chatId
        }
    }
}

export function closeChat(chatId) {
    return {
        type: C.CLOSE_CHAT,
        payload: {
            chatId
        }
    }
}

export function addMember(chatId, user) {
    return {
        type: C.ADD_MEMBER,
        payload: {
            chatId, user
        }
    }
}

export function newMessage(userId, chatId, message) {
    return {
        type: C.NEW_MESSAGE,
        payload: {
            userId, chatId, message
        }
    }
}

export function setDocument(document) {
    return {
        type: C.SET_DOCUMENT,
        payload: {
            document
        }
    }
}

export function setDocuments(documents) {
    return {
        type: C.SET_DOCUMENTS,
        payload: {
            documents
        }
    }
}

export function setDataTable(table) {
    return {
        type: C.SET_DATA_TABLE,
        payload: {
            table
        }
    }
}