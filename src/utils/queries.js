import gql from 'graphql-tag'

// BEGIN USER
export const LOGIN = gql`
    mutation login(
        $name: String!
        $password: String!
        $area: String
    ) {
        login(
            name: $name
            password: $password
            area: $area
        ) {
            id
            name
            email
            phone
            role {
                name
            }
            balance
            level
            experience
            avatar {
                id
                name
                path
            }
            availableAvatars {
                id
                name
                path
            }
            preferences {
                id
                title
                color
                slogan
                icon {
                    name
                    path
                }
            }
            sessionID
            updatedAt
            createdAt
        }
    }
`

export const REGISTER = gql`
    mutation register(
        $name: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $phone: String
        $role: ID
        $avatar: ID
    ) {
        register(
            registerInput: {
                name: $name
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                phone: $phone
                role: $role
                avatar: $avatar
            }
        ) {
            name
            email
            phone
            role {
                name
            }
            balance
            level
            experience
            avatar {
                id
                name
                path
            }
            availableAvatars {
                id
                name
                path
            }
            preferences {
                id
                title
                color
                slogan
                icon {
                    name
                    path
                }
            }
            sessionID
            updatedAt
            createdAt
        }
    }
`

export const GET_ALL_USERS = gql`
    query allUsers {
        allUsers {
            name
            email
            phone
            role {
                name
            }
            balance
            level
            experience
            avatar {
                id
                name
                path
            }
            availableAvatars {
                id
                name
                path
            }
            preferences {
                id
                title
                color
                slogan
            }
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_USERS = gql`
    subscription users {
        users {
            name
            email
            phone
            role {
                name
            }
            balance
            level
            experience
            avatar {
                id
                name
                path
            }
            availableAvatars {
                id
                name
                path
            }
            preferences {
                id
                title
                color
                slogan
                icon {
                    name
                    path
                }
            }
            updatedAt
            createdAt
        }
    }
`

export const GET_USER = gql`
    query getUser {
        getUser {
            name
            password
            email
            phone
            role {
                name
            }
            balance
            level
            experience
            avatar {
                id
                name
                path
            }
            availableAvatars {
                id
                name
                path
            }
            preferences {
                id
                title
                color
                slogan
                icon {
                    name
                    path
                }
            }
            updatedAt
            createdAt
        }
    }
`

export const EDIT_USER = gql`
    mutation editUser(
        $name: String
        $email: String
        $password: String
        $phone: String
        $role: ID
        $balance: Int
        $level: Int
        $avatar: ID
        $availableAvatars: [ID]
        $experience: Int
        $preferences: [ID]
        $settings: [Setting]
    ) {
        editUser(
            name: $name
            email: $email
            password: $password
            phone: $phone
            role: $role
            balance: $balance
            level: $level
            avatar: $avatar
            availableAvatars: $availableAvatars
            experience: $experience
            preferences: $preferences
            settings: $settings
        )
    }
`

export const DELETE_USERS = gql`
    mutation deleteUsers(
        $names: [String]
    ) {
        deleteUsers(names: $names)
    }
`

// BEGIN STATS
export const GET_USER_COUNT_POSTS = gql`
    query countUserPosts {
        countUserPosts
    }
`

export const GET_STATS = gql`
    query allStats {
        countUsers
        countPosts
        countComments
        countHubs
    }
`

export const GET_ALL_RARITIES = gql`
    query allRarities {
        allRarities
    }
`

export const GET_ALL_STATUS = gql`
    query allStatus {
        allStatus
    }
`
// END STATS

// BEGIN CHAT
export const GET_ALL_CHAT_TYPES = gql`
    query allChatTypes {
        allChatTypes
    }
`

export const ADD_CHAT = gql`
    mutation addChat(
        $type: ChatType!
        $title: String!
        $members: [String]!
    ) {
        addChat (
            type: $type
            title: $title
            members: $members
        )
    }
`

export const EDIT_CHAT = gql`
    mutation editChat(
        $id: ID!
        $type: ChatType
        $title: String
        $members: [String]
    ) {
        editChat (
            id: $id
            type: $type
            title: $title
            members: $members
        )
    }
`

export const DELETE_CHATS = gql`
    mutation deleteChats(
        $id: [ID]!
    ) {
        deleteChats (
            id: $id
        )
    }
`

export const GET_ALL_CHATS = gql`
    query allChats {
        allChats {
            id
            type
            title
            members {
                name
                avatar {
                    path
                }
            }
            messages {
                user {
                    name
                    avatar {
                        path
                    }
                }
                text
                type
                updatedAt
                createdAt
            }
        }
    }
`

export const SUB_ALL_CHATS = gql`
    subscription chats {
        chats {
            id
            type
            title
            members {
                name
                avatar {
                    path
                }
            }
            messages {
                user {
                    name
                    avatar {
                        path
                    }
                }
                text
                type
                updatedAt
                createdAt
            }
        }
    }
`

export const DELETE_USER_CHATS = gql`
    mutation deleteUserChats(
        $id: [ID]!
    ) {
        deleteUserChats(
            id: $id
        )
    }
`

export const GET_USER_CHATS = gql`
    query allUserChats {
        allUserChats {
            id
            chat {
                id
                type
                title
                members {
                    name
                    avatar {
                        path
                    }
                }
                messages {
                    user {
                        name
                        avatar {
                            path
                        }
                    }
                    text
                    type
                    updatedAt
                    createdAt
                }
            }
            interlocutor {
                name
                avatar {
                    path
                }
            }
            status
            updatedAt
            createdAt
        }
    }
`

export const GET_CHAT_MESSAGES = gql`
    query allChatMessages(
        $id: ID!
    ) {
        allChatMessages(
            id: $id
        ) {
            user {
                name
                avatar {
                    path
                }
            }
            text
            type
            updatedAt
            createdAt
        }
    }
`

export const SUB_USER_CHATS = gql`
    subscription userChats(
        $name: String!
    ) {
        userChats(
            name: $name
        ) {
            id
            chat {
                id
                type
                title
                members {
                    name
                    avatar {
                        path
                    }
                }
                messages {
                    user {
                        name
                        avatar {
                            path
                        }
                    }
                    text
                    type
                    updatedAt
                    createdAt
                }
            }
            interlocutor {
                name
                avatar {
                    path
                }
            }
            status
            updatedAt
            createdAt
        }
    }
`

export const SUB_MESSAGES = gql`
    subscription messages(
        $id: ID!
    ) {
        messages(
            id: $id
        ) {
            user {
                name
                avatar {
                    id
                    path
                }
            }
            text
            type
            updatedAt
            createdAt
        }
    }
`

export const OPEN_USER_CHAT = gql`
    mutation openUserChat(
        $name: String!
        $type: ChatType
    ) {
        openUserChat(
            name: $name
            type: $type
        ) {
            id
            chat {
                id
                title
                members {
                    name
                    avatar {
                        path
                    }
                }
                messages {
                    user {
                        name
                        avatar {
                            path
                        }
                    }
                    text
                    type
                    updatedAt
                    createdAt
                }
            }
            interlocutor {
                name
                avatar {
                    path
                }
            }
            status
            updatedAt
            createdAt
        }
    }
`

export const ADD_USER_CHAT_MESSAGE = gql`
    mutation addUserChatMessage(
        $id: ID!
        $text: String!
    ) {
        addUserChatMessage(
            id: $id
            text: $text
        )
    }
`
// END CHAT

export const SUB_NOTIFICATIONS = gql`
    subscription userNotifications(
        $name: String!
    ) {
        userNotifications(
            name: $name
        )  {
            id
            text
            user {
                avatar {
                    path
                }
            }
            createdAt
        }
    }
`

export const GET_USER_NOTIFICATIONS = gql`
    query allUserNotifications {
        allUserNotifications {
            id
            text
            user {
                avatar {
                    path
                }
            }
            createdAt
        }
    }
`
// END USER

// BEGIN ACT
export const GET_USER_ACTS = gql`
    query allUserActs {
        allUserActs {
            id
            act {
                id
                title
                description
                tasks {
                    id
                    title
                    icon {
                        id
                        path
                    }
                    translation
                    condition {
                        id
                        action
                        target
                        goals
                        multiply
                        specific {
                            id
                            area
                        }
                        union
                        link {
                            id
                            action
                        }
                    }
                    awards {
                        id
                        award
                        quantity
                    }
                    createdAt
                }
                awards {
                    id
                    award
                    quantity
                }
                successor {
                    id
                    title
                }
                status
                updatedAt
                createdAt
            }
            tasks {
                task {
                    id
                    title
                }
                status
            }
            status
        }
    }
`

export const SUB_USER_ACTS = gql`
    subscription userActs {
        userActs {
            act {
                id
                title
                description
                tasks {
                    id
                    title
                    icon {
                        id
                        path
                    }
                    translation
                    condition {
                        id
                        action
                        target
                        goals
                        multiply
                        specific {
                            id
                            area
                        }
                        union
                        link {
                            id
                            action
                        }
                    }
                    awards {
                        id
                        award
                        quantity
                    }
                    createdAt
                }
                awards {
                    id
                    award
                    quantity
                }
                successor {
                    id
                    title
                }
                status
                updatedAt
                createdAt
            }
            tasks {
                task {
                    id
                    title
                }
                status
            }
            status
        }
    }
`

export const GET_ALL_ACTS = gql`
    query allActs {
        allActs {
            id
            title
            description
            tasks {
                id
                title
                icon {
                    id
                    path
                }
                translation
                condition {
                    id
                    action
                    target
                    goals
                    multiply
                    specific {
                        id
                        area
                    }
                    union
                    link {
                        id
                        action
                    }
                }
                awards {
                    id
                    award
                    quantity
                }
                createdAt
            }
            awards {
                id
                award
                quantity
            }
            successor {
                id
                title
            }
            isSource
            status
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_ACTS = gql`
    subscription acts {
        acts {
            id
            title
            description
            tasks {
                id
                title
                icon {
                    id
                    path
                }
                translation
                condition {
                    action
                    target
                    goals
                    multiply
                    specific {
                        id
                        area
                    }
                    union
                    link {
                        id
                        action
                    }
                }
                awards {
                    id
                    award
                    quantity
                }
                createdAt
            }
            awards {
                id
                award
                quantity
            }
            successor {
                id
                title
            }
            isSource
            status
            updatedAt
            createdAt
        }
    }
`

export const ADD_ACT = gql`
    mutation addAct(
        $title: String!
        $description: String!
        $tasks: [InputActTask]!
        $awards: [InputAward]
        $successor: ID
        $isSource: Boolean
        $status: Status!
    ) {
        addAct(
            title: $title
            description: $description
            tasks: $tasks
            awards: $awards
            successor: $successor
            isSource: $isSource
            status: $status
        )
    }
`

export const EDIT_ACT = gql`
    mutation editAct(
        $id: ID!
        $title: String
        $description: String
        $tasks: [InputActTask]
        $awards: [InputAward]
        $successor: ID
        $isSource: Boolean
        $status: Status
    ) {
        editAct(
            id: $id
            title: $title
            description: $description
            tasks: $tasks
            awards: $awards
            successor: $successor
            isSource: $isSource
            status: $status
        )
    }
`

export const DELETE_ACTS = gql`
    mutation deleteActs(
        $id: [ID]!
    ) {
        deleteActs(id: $id)
    }
`

export const GET_ALL_AWARDS = gql`
    query allAwardTypes {
        allAwardTypes
    }
`

export const GET_ALL_CONDITION_ENUMS = gql`
    query allEnums {
        allAwardTypes
        allActions
        allGoals
        allUnions
        allAreas
    }
`
// END ACT

// BEGIN HUB
export const GET_ALL_HUBS = gql`
    query allHubs($status: Status) {
        allHubs(status: $status) {
            id
            title
            description
            slogan
            icon {
                id
                name
                path
            }
            color
            status
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_HUBS = gql`
    subscription hubs(
        $status: Status
    ) {
        hubs(
            status: $status
        ) {
            id
            title
            description
            slogan
            icon {
                path
            }
            color
            status
            updatedAt
            createdAt
        }
    }
`

export const ADD_HUB = gql`
    mutation addHub(
        $title: String!
        $description: String!
        $slogan: String!
        $color: String
        $icon: ID
        $status: Status!
    ) {
        addHub(
            title: $title
            description: $description
            slogan: $slogan
            color: $color
            icon: $icon
            status: $status
        )
    }
`

export const EDIT_HUB = gql`
    mutation editHub(
        $id: ID!
        $title: String
        $description: String
        $slogan: String
        $color: String
        $icon: ID
        $status: Status
    ) {
        editHub(
            id: $id
            title: $title
            description: $description
            slogan: $slogan
            color: $color
            icon: $icon
            status: $status
        )
    }
`

export const DELETE_HUBS = gql`
    mutation deleteHubs(
        $id: [ID]
    ) {
        deleteHubs(id: $id)
    }
`
// END HUB

// BEGIN POST
export const GET_ALL_POST_TYPES = gql`
    query allPostTypes {
        allPostTypes
    }
`

export const GET_USER_POSTS = gql`
    query allUserPosts {
        allUserPosts {
            id
            type
            author {
                id
                name
                avatar {
                    path
                }
            }
            title
            subtitle
            description
            content
            preview {
                path
            }
            views
            comments {
                id
                user {
                    name
                    avatar {
                        path
                    }
                }
                text
                updatedAt
                createdAt
            }
            hub {
                id
                title
                color
            }
            status
            updatedAt
            createdAt
        }
    }
`

export const GET_ALL_POSTS = gql`
    query allPosts($status: Status, $type: PostType) {
        allPosts(status: $status, type: $type) {
            id
            type
            author {
                id
                name
                avatar {
                    path
                }
            }
            title
            subtitle
            description
            content
            preview {
                path
            }
            views
            comments {
                id
                user {
                    name
                    avatar {
                        path
                    }
                }
                text
                updatedAt
                createdAt
            }
            hub {
                id
                title
                color
            }
            status
            updatedAt
            createdAt
        }
    }
`

export const SUB_USER_POSTS = gql`
    subscription userPosts(
        $name: String!
        $type: PostType
    ) {
        userPosts(
            name: $name
            type: $type
        ) {
            id
            type
            author {
                id
                name
                avatar {
                    path
                }
            }
            title
            subtitle
            description
            content
            preview {
                path
            }
            views
            comments {
                id
                user {
                    name
                    avatar {
                        path
                    }
                }
                text
                updatedAt
                createdAt
            }
            hub {
                id
                title
                color
            }
            status
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_POSTS = gql`
    subscription posts(
        $status: Status
        $type: PostType
    ) {
        posts(
            status: $status
            type: $type
        ) {
            
            id
            type
            author {
                id
                name
                avatar {
                    path
                }
            }
            title
            subtitle
            description
            content
            preview {
                path
            }
            views
            comments {
                id
                user {
                    name
                    avatar {
                        path
                    }
                }
                text
                updatedAt
                createdAt
            }
            hub {
                id
                title
                color
            }
            status
            updatedAt
            createdAt
        }
    }
`

export const GET_POST = gql`
    query getPost(
        $id: ID!
        $type: PostType
    ) {
        getPost(
            id: $id
            type: $type
        ) {
            id
            type
            author {
                id
                name
                avatar {
                    path
                }
            }
            title
            subtitle
            description
            content
            preview {
                path
            }
            views
            comments {
                id
                user {
                    name
                    avatar {
                        path
                    }
                }
                text
                updatedAt
                createdAt
            }
            hub {
                id
                title
                color
            }
            status
            updatedAt
            createdAt
        }
    }
`

export const ADD_POST = gql`
    mutation addPost(
        $author: ID
        $type: PostType!
        $title: String!
        $subtitle: String
        $description: String
        $content: String
        $preview: Upload
        $hub: ID
        $views: Int
        $comments: [InputComment]
        $status: Status!
    ) {
        addPost(
            author: $author
            type: $type
            title: $title
            subtitle: $subtitle
            description: $description
            content: $content
            preview: $preview
            hub: $hub
            views: $views
            comments: $comments
            status: $status
        )
    }
`

export const EDIT_POST = gql`
    mutation editPost(
        $id: ID!
        $author: ID
        $type: PostType
        $title: String
        $subtitle: String
        $description: String
        $content: String
        $preview: Upload
        $hub: ID
        $views: Int
        $comments: [InputComment]
        $status: Status
    ) {
        editPost(
            author: $author
            type: $type
            title: $title
            subtitle: $subtitle
            description: $description
            content: $content
            preview: $preview
            hub: $hub
            views: $views
            comments: $comments
            status: $status
        )
    }
`

export const DELETE_POSTS = gql`
    mutation deletePosts(
        $posts: [InputPost]
    ) {
        deletePosts(posts: $posts)
    }
`

export const SUB_COMMENTS = gql`
    subscription comments(
        $id: ID!
    ) {
        comments(
            id: $id
        ) {
            id
            user {
                name
                avatar {
                    path
                }
            }
            text
            updatedAt
            createdAt
        }
    }
`

export const ADD_COMMENT = gql`
    mutation addComment(
        $post: ID!
        $text: String!
    ) {
        addComment(
            post: $post
            text: $text
        )
    }
`

export const EDIT_COMMENT = gql`
    mutation editComment(
        $id: ID!
        $post: ID
        $user: ID
        $text: String
    ) {
        editComment(
            id: $id
            post: $post
            user: $user
            text: $text
        )
    }
`

export const DELTE_COMMENTS = gql`
    mutation deleteComments(
        $id: [ID]!
        $post: ID!
    ) {
        deleteComments(
            id: $id
            post: $post
        )
    }
`
// END POST

// BEGIN ROLE
export const GET_ALL_ROLES = gql`
    query allRoles {
        allRoles {
            id
            name
            permissions
            updatedAt
            createdAt
        }
    }
`

export const ADD_ROLE = gql`
    mutation addRole(
        $name: String!
        $permissions: [Permission!]!
    ) {
        addRole(
            name: $name
            permissions: $permissions
        )
    }
`

export const EDIT_ROLE = gql`
    mutation editRole(
        $id: ID!
        $name: String!
        $permissions: [Permission]
    ) {
        editRole(
            id: $id
            name: $name
            permissions: $permissions
        )
    }
`

export const DELETE_ROLES = gql`
    mutation deleteRoles($id: [ID]!) {
        deleteRoles(id: $id)
    }
`

export const SUB_ALL_ROLES = gql`
    subscription roles {
        roles {
            id
            name
            permissions
            updatedAt
            createdAt
        }
    }
`
// END ROLE

// BEGIN PERMITIONS
export const GET_ALL_PERMITIONS = gql`
    query allPermissions {
        allPermissions
    }
`
// END PERMITIONS

// BEGIN IMAGES
export const GET_ALL_IMAGES = gql`
    query allImages {
        allImages {
            id
            path
            name
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_IMAGES = gql`
    subscription images {
        images {
            id
            name
            path
            updatedAt
            createdAt
        }
    }
`

export const ADD_IMAGE = gql`
    mutation addImage(
        $file: Upload!
    ) {
        addImage(
            file: $file
        )
    }
`

export const EDIT_IMAGE = gql`
    mutation editImage(
        $id: ID!
        $file: Upload
    ) {
        editImage(
            id: $id
            file: $file
        )
    }
`

export const DELETE_IMAGES = gql`
    mutation deleteImages(
        $id: [ID]!
    ) {
        deleteImages(
            id: $id
        )
    }
`
// END IMAGES

// BEGIN AVATARS
export const GET_ALL_AVATARS = gql`
    query allAvatars {
        allAvatars {
            id
            path
            name
            rarity
            hub {
                id
                title
            }
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_AVATARS = gql`
    subscription avatars {
        avatars {
            id
            path
            name
            rarity
            hub {
                id
                title
            }
            updatedAt
            createdAt
        }
    }
`

export const ADD_AVATAR = gql`
    mutation addAvatar(
        $file: Upload!
        $rarity: Rarity!
        $hub: ID!
    ) {
        addAvatar(
            file: $file
            rarity: $rarity
            hub: $hub
        )
    }
`

export const EDIT_AVATAR = gql`
    mutation editAvatar(
        $id: ID!
        $file: Upload
        $rarity: Rarity
        $hub: ID
    ) {
        editAvatar(
            id: $id
            file: $file
            rarity: $rarity
            hub: $hub
        )
    }
`

export const DELETE_AVATARS = gql`
    mutation deleteAvatars(
        $id: [ID]!
    ) {
        deleteAvatars(
            id: $id
        )
    }
`
// END AVATARS

// BEGIN ICONS
export const GET_ALL_ICON_TYPES = gql`
    query allIconTypes {
        allIconTypes
    }
`

export const GET_ALL_ICONS = gql`
    query allIcons {
        allIcons {
            id
            path
            name
            type
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_ICONS = gql`
    subscription icons {
        icons {
            id
            path
            name
            type
            updatedAt
            createdAt
        }
    }
`

export const ADD_ICON = gql`
    mutation addIcon(
        $file: Upload!
        $type: IconType!
    ) {
        addIcon(
            file: $file
            type: $type
        )
    }
`

export const EDIT_ICON = gql`
    mutation editIcon(
        $id: ID!
        $file: Upload
        $type: IconType
    ) {
        editIcon(
            id: $id
            file: $file
            type: $type
        )
    }
`

export const DELETE_ICONS = gql`
    mutation deleteIcons(
        $id: [ID]!
    ) {
        deleteIcons(
            id: $id
        )
    }
`
// END ICONS

// BEGIN LANGUAGE
export const GET_ALL_LANGUAGES = gql`
    query allLanguages {
        allLanguages {
            id
            code
            title
            flag {
                id
                path
            }
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_LANGUAGES = gql`
    subscription languages {
        languages {
            id
            code
            title
            flag {
                id
                path
            }
            updatedAt
            createdAt
        }
    }
`

export const ADD_LANGUAGE = gql`
    mutation addLanguage(
        $code: String!
        $title: String!
        $flag: ID!
    ) {
        addLanguage(
            code: $code
            title: $title
            flag: $flag
        )
    }
`

export const EDIT_LANGUAGE = gql`
    mutation editLanguage(
        $id: ID!
        $code: String
        $title: String
        $flag: ID
    ) {
        editLanguage(
            id: $id
            code: $code
            title: $title
            flag: $flag
        )
    }
`

export const DELETE_LANGUAGES = gql`
    mutation deleteLanguages(
        $id: [ID]!
    ) {
        deleteLanguages(
            id: $id
        )
    }
`
// END LANGUAGE