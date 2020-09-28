import { combineReducers } from 'redux'
import C from './types'
import { v4 } from 'uuid'

export function userReducer(state = {}, action) {
    switch (action.type) {
        case C.SET_USER:
            return action.payload.user
        case C.ADD_CHAT:
            return {
                ...state,
                chats: state.chats.map(chat => (chat.userId !== action.payload.chatId) ? ({
                    chatId: action.payload.chatId
                }) : chat),
            }
        case C.CLOSE_CHAT:
            return {
                ...state,
                chats: state.chats.filter(chat =>
                    (chat.chatId !== action.payload.chatId)
                )
            }
        default:
            return state
    }
}

export function chatReducer(state={}, { type, payload }) {
    switch (type) {
        case C.SET_CHAT:
            return payload.chat
        default:
            return state
    }
}

export function documentReducer(state={}, { type, payload }) {
    switch (type) {
        case C.SET_DOCUMENT:
            return payload.document
        
        case C._act_ADD_TASK:
            return {
                ...state,
                tasks: [
                    ...(state?.tasks || []),
                    {
                        id: v4(),
                        title: null,
                        icon: {},
                        condition: [],
                        awards: [],
                        isDropdownIcons: false
                    }
                ]
            }
        default:
            return state
    }
}

export function controlReducer(state={}, { type, payload }) {
    switch (type) {
        case C.REGISTER_FIELD:
            return {
                ...state,
                [payload.name]: payload.state
            }
        default:
            return state
    }
}

export function documentsReducer(state={}, { type, payload }) {
    switch (type) {
        case C.SET_DOCUMENTS:
            return payload.documents
        default:
            return state
    }
}

export function tableReducer(state=[], { type, payload }) {
    switch(type) {
        case C.SET_DATA_TABLE:
            return payload.table
        default:
            return state
    }
}

export function filtersReducer(state={}, { type, payload }) {
    switch(type) {
        case C.SET_CURRENT_HUB:
            return {
                ...state,
                currentHub: payload
            }
        default:
            return state
    }
}

export const reducers = combineReducers({
    user: userReducer,
    chat: chatReducer,
    control: controlReducer,
    document: documentReducer,
    documents: documentsReducer,
    table: tableReducer,
    filters: filtersReducer
})