import gql from 'graphql-tag'

// BEGIN USER
export const LOGIN = gql`
    mutation login(
        $name: String!
        $password: String!
    ) {
        login(
            name: $name
            password: $password
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
            chats {
                chatId
            }
            sessionID
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
            chats {
                chatId
            }
            sessionID
        }
    }
`

export const GET_ALL_USERS = gql`
    query allUsers {
        allUsers {
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
            chats {
                chatId
            }
            updatedAt
            createdAt
        }
    }
`

export const SUB_ALL_USERS = gql`
    subscription users {
        users {
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
            chats {
                chatId
            }
        }
    }
`

export const GET_USER = gql`
    query getUser {
        getUser {
            id
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
            chats {
                chatId
            }
        }
    }
`

export const EDIT_USER = gql`
    mutation editUser(
        $name: String!
        $email: String!
        $password: String!
    ) {
        editUser(
            name: $name
            email: $email
            password: $password
        )
    }
`

export const DELETE_USERS = gql`
    mutation deleteUsers(
        $id: [ID]
    ) {
        deleteUsers(id: $id)
    }
`
// END USER

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
        }
    }
`

export const SUB_ALL_HUBS = gql`
    subscription hubs($status: Status) {
        hubs(status: $status) {
            id
            title
            description
            slogan
            icon {
                path
            }
            color
            countUsers
            countOffers
            status
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

// BEGIN ARTICLE
export const GET_USER_ARTICLES = gql`
    query allUserArticles($id: ID!) {
        allUserArticles(id: $id) {
            id
            title
            description
            body
            views
            image {
                path
            }
            comments {
                message
            }
            hub {
                id
                title
            }
            author {
                id
                name
            }
            createdAt
        }
    }
`

export const GET_ALL_ARTICLES = gql`
    query allArticles($status: Status) {
        allArticles(status: $status) {
            id
            title
            description
            body
            views
            image {
                path
            }
            comments {
                message
            }
            hub {
                id
                title
            }
            author {
                id
                name
            }
            status
            createdAt
        }
    }
`

export const SUB_USER_ARTICLES = gql`
    subscription userArticles(
        $id: ID!
    ) {
        userArticles(
            id: $id
        ) {
            id
            title
            description
            body
            views
            image {
                path
            }
            comments {
                message
            }
            hub {
                id
                title
            }
            author {
                id
                name
            }
            createdAt
        }
    }
`

export const SUB_ARTICLES = gql`
    subscription articles($status: Status) {
        articles(status: $status) {
            id
            title
            description
            body
            views
            image {
                path
            }
            comments {
                message
            }
            hub {
                id
                title
            }
            author {
                id
                name
            }
            createdAt
        }
    }
`

export const GET_ARTICLE = gql`
    query getArticle($id: ID!) {
        getArticle(id: $id) {
            id
            title
            description
            body
            image {
                id
                name
                path
            }
            hub {
                id
                title
            }
            source
            url
        }
    }
`

export const ADD_ARTICLE = gql`
    mutation addArticle(
        $author: ID!
        $title: String!
        $description: String!
        $body: String!
        $hub: ID!
        $image: Upload
        $status: Status!
    ) {
        addArticle(
            author: $author
            title: $title
            description: $description
            body: $body
            hub: $hub
            image: $image
            status: $status
        )
    }
`

export const EDIT_ARTICLE = gql`
    mutation editArticle(
        $id: ID!
        $title: String
        $description: String
        $body: String
        $hub: ID
        $image: Upload
        $status: Status
    ) {
        editArticle(
            id: $id
            title: $title
            description: $description
            body: $body
            hub: $hub
            image: $image
            status: $status
        )
    }
`

export const DELETE_ARTICLES = gql`
    mutation deleteArticles(
        $articles: [InputArticle]
    ) {
        deleteArticles(articles: $articles)
    }
`
// END ARTICLE

// BEGIN OFFER
export const GET_USER_OFFERS = gql`
    query allUserOffers($id: ID!) {
        allUserOffers(id: $id) {
            id
            title
            message
            user {
                id
                name
            }
            hub {
                id
                title
            }
            status
            createdAt
        }
    }
`

export const SUB_USER_OFFERS = gql`
    subscription userOffers($id: ID!) {
        userOffers(id: $id) {
            id
            title
            message
            user {
                id
                name
            }
            hub {
                id
                title
            }
            status
            createdAt
        }
    }
`

export const GET_ALL_OFFERS = gql`
    query allOffers($status: Status) {
        allOffers(status: $status) {
            id
            title
            message
            user {
                id
                name
            }
            hub {
                id
                title
            }
            status
            createdAt
        }
    }
`

export const SUB_ALL_OFFERS = gql`
    subscription offers($status: Status) {
        offers(status: $status) {
            id
            title
            message
            user {
                id
                name
            }
            hub {
                id
                title
            }
            status
            createdAt
        }
    }
`

export const ADD_OFFER = gql`
    mutation addOffer(
        $user: ID!
        $hub: ID!
        $title: String!
        $message: String!
        $status: Status!
    ) {
        addOffer(
            user: $user
            hub: $hub
            title: $title
            message: $message
            status: $status
        )
    }
`

export const EDIT_OFFER = gql`
    mutation editOffer(
        $id: ID!
        $user: ID
        $hub: ID
        $title: String
        $message: String
        $status: Status
    ) {
        editOffer(
            id: $id
            user: $user
            hub: $hub
            title: $title
            message: $message
            status: $status
        )
    }
`

export const DELETE_OFFERS = gql`
    mutation deleteOffers(
        $offers: [InputOffer]
    ) {
        deleteOffers(offers: $offers)
    }
`
// END HUB