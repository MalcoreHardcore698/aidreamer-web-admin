import C from './types'

export function setUser(user) {
    return {
        type: C.SET_USER,
        payload: {
            user: (user?.name) ? user : null
        }
    }
}

export function setForm(form) {
    return {
        type: C.SET_FORM,
        payload: {
            form
        }
    }
}

export function setChat(chat) {
    return {
        type: C.SET_CHAT,
        payload: {
            chat
        }
    }
}

export function setCurrentHub(hub) {
    return {
        type: C.SET_CURRENT_HUB,
        payload: hub
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

export function registerField(name, state) {
    return {
        type: C.REGISTER_FIELD,
        payload: {
            name, state
        }
    }
}

export function _act_AddTask() {
    return {
        type: C._act_ADD_TASK
    }
}

export function _act_AddTaskIcon() {
    return {
        type: C._act_ADD_TASK_ICON
    }
}

export function _act_AddTaskCondition() {
    return {
        type: C._act_ADD_TASK_CONDITION
    }
}

export function _act_AddTaskAward() {
    return {
        type: C._act_ADD_TASK_AWARD
    }
}

export function _act_AddAward() {
    return {
        type: C._act_ADD_AWARD
    }
}

export function _act_SetTaskConditionAction() {
    return {
        type: C._act_SET_TASK_CONDITION_ACTIONS
    }
}

export function _act_SetTaskConditionGoals() {
    return {
        type: C._act_SET_TASK_CONDITION_GOALS
    }
}

export function _act_SetTaskConditionTarget() {
    return {
        type: C._act_SET_TASK_CONDITION_TARGET
    }
}

export function _act_SetTaskConditionSpecificId() {
    return {
        type: C._act_SET_TASK_CONDITION_SPECIFIC_ID
    }
}

export function _act_SetTaskConditionSpecificArea() {
    return {
        type: C._act_SET_TASK_CONDITION_SPECIFIC_AREA
    }
}

export function _act_SetTaskConditionUnion() {
    return {
        type: C._act_SET_TASK_CONDITION_UNION
    }
}

export function _act_SetTaskConditionLink() {
    return {
        type: C._act_SET_TASK_CONDITION_LINK
    }
}

export function _act_SetTaskAwardType() {
    return {
        type: C._act_SET_TASK_AWARD_TYPE
    }
}

export function _act_SetAwardType() {
    return {
        type: C._act_SET_AWARD_TYPE
    }
}

export function _act_SetSuccessor() {
    return {
        type: C._act_SET_SUCCESSOR
    }
}

export function _act_SetStatus() {
    return {
        type: C._act_SET_STATUS
    }
}

export function _act_DeleteTask() {
    return {
        type: C._act_DELETE_TASK
    }
}

export function _act_DeleteTaskCondition() {
    return {
        type: C._act_DELETE_TASK_CONDITION
    }
}

export function _act_DeleteTaskAward() {
    return {
        type: C._act_DELETE_TASK_AWARD
    }
}

export function _act_ToggleTaskIcons() {
    return {
        type: C._act_TOGGLE_TASK_ICONS
    }
}

export function _act_ToggleTaskComplexCondition() {
    return {
        type: C._act_TOGGLE_TASK_COMPLEX_CONDITION
    }
}

export function _act_ToggleSuccessor() {
    return {
        type: C._act_TOGGLE_SUCCESSOR
    }
}