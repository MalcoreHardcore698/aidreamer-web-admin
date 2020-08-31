import gql from 'graphql-tag'

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
            role
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
            token
            isVerifiedEmail
            isVerifiedPhone
            isNotified
        }
    }
`

export const REGISTER = gql`
    mutation register(
        $name: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                name: $name
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            name
            email
            phone
            role
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
            token
            isVerifiedEmail
            isVerifiedPhone
            isNotified
        }
    }
`

export const GET_ALL_OFFERS = gql`
    query allOffers($status: Status!) {
        allOffers(status: $status) {
            id
            title
            message
            user {
                id
                name
                avatar {
                    id
                    name
                    path
                }
            }
            hub {
                id
                title
                color
            }
        }
    }
`

export const GET_ALL_HUBS = gql`
    query allHubs($status: Status!) {
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
            poster {
                id
                name
                path
            }
            color
        }
    }
`

export const GET_USER_ARTICLES = gql`
    query allUserNews($id: ID!) {
        allUserNews(id: $id) {
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
                title
            }
            author {
                name
                avatar {
                    path
                }
            }
            createdAt
        }
    }
`

export const ADD_NEWS = gql`
    mutation addNews(
        $author: ID!
        $title: String!
        $description: String!
        $body: String!
        $hub: ID!
        $image: Upload
        $status: Status!
    ) {
        addNews(
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

export const EDIT_NEWS = gql`
    mutation editNews(
        $id: ID!
        $title: String
        $description: String
        $body: String
        $hub: ID
        $image: Upload
    ) {
        editNews(
            id: $id
            title: $title
            description: $description
            body: $body
            hub: $hub
            image: $image
        )
    }
`

export const GET_ALL_ARTICLES = gql`
    query allNews($status: Status!) {
        allNews(status: $status) {
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
                title
            }
            author {
                name
                avatar {
                    path
                }
            }
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
                title
            }
            author {
                name
                avatar {
                    path
                }
            }
            createdAt
        }
    }
`

export const SUB_ARTICLES = gql`
    subscription articles {
        articles {
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
                title
            }
            author {
                name
                avatar {
                    path
                }
            }
            createdAt
        }
    }
`

export const GET_NEWS = gql`
    query getNews($id: ID!) {
        getNews(id: $id) {
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

export const DELETE_ARTICLE = gql`
    mutation deleteNews(
        $id: [ID!]!
    ) {
        deleteNews(id: $id)
    }
`

export const GET_ALL_USER_TRANSACTIONS = gql`
    query {
        allUserTransactions {
            id
            title
            date
            sum
        }
    }
`

export const GET_ALL_USER_NOTIFICATIONS = gql`
    query {
        allUserNotifications {
            id
            title
            name
            message
            date
        }
    }
`

export const GET_POPULAR_HUB_CHAT = gql`
    query {
        getPopularHubChat {
            id
            title
            description
            slogan
            members
            offers
        }
    }
`

export const GET_ALL_TOURNAMENTS = gql`
    query {
        allTournaments {
            id
            title
            members
            prize
        }
    }
`

export const GET_ALL_AVATARS = gql`
  query {
    allAvatars {
      id
      order
      name
      path
      complexity
      hub {
        id
        title
        color
        icon {
          id
          path
        }
      }
    }
  }
`

export const GET_USER = gql`
    query getUser($id: ID!) {
        getUser(id: $id) {
            id
            name
            password
            email
            phone
            role
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
            isVerifiedEmail
            isVerifiedPhone
            isNotified
        }
    }
`

export const GET_HUB = gql`
    query getHub($id: ID!) {
        getHub(id: $id) {
            title
            description
            slogan
            icon {
                id
                name
                path
            }
            poster {
                id
                name
                path
            }
            color
            offers {
                title
                message
                user {
                    id
                    name
                    avatar {
                        id
                        name
                        path
                    }
                }
                hub {
                    color
                }
            }
        }
    }
`

export const ADD_CHAT = gql`
    mutation addChat(
        $id: ID!
        $title: String!
        $participants: [UserIDInput!]!
        $owner: ID!
    ) {
        addChat(
            id: $id
            title: $title
            participants: $participants
            owner: $owner
        )
    }
`

export const GET_CHAT = gql`
    query getChat(
        $id: ID!
    ) {
        getChat(
            id: $id
        ) {
            id
            title
            owner
            participants {
                id
                name
                avatar {
                    id
                    path
                }
            }
            messages {
                sender {
                    id
                    name
                    avatar {
                        id
                        path
                    }
                }
                receiver {
                    id
                    name
                    avatar {
                        id
                        path
                    }
                }
                message
                dateCreated
            }
            dateCreated
        }
    }
`

export const CLOSE_USER_CHAT = gql`
    mutation closeUserChat(
        $userId: ID!
        $chatId: ID!
    ) {
        closeUserChat(
            userId: $userId
            chatId: $chatId
        )
    }
`

export const ADD_MESSAGE = gql`
    mutation addMessage(
        $chat: ID!
        $sender: ID!
        $receiver: ID!
        $message: String!
    ) {
        addMessage(
            chat: $chat
            sender: $sender
            receiver: $receiver
            message: $message
        )
    }
`

export const ADD_MESSAGE_SUBSCRIPTION = gql`
    subscription messages($chat: ID!) {
        messages (chat: $chat) {
            id
            message
            sender {
                id
                name
                avatar {
                    id
                    path
                }
            }
            receiver {
                id
                name
                avatar {
                    id
                    path
                }
            }
            dateCreated
        }
    }
`

export const USER_CHAT_SUBSCRIPTION = gql`
    subscription userchats($user: ID!) {
        userchats(user: $user) {
            id
            userId
            chatId
        }
    }
`

export const ADD_OFFER = gql`
  mutation addOffer(
    $title: String!
    $message: String!
    $user: ID!
    $hub: ID!
    $status: Status!
    $dateEdited: String
    $datePublished: String
    $dateCreated: String!
  ) {
    addOffer(
      title: $title
      message: $message
      user: $user
      hub: $hub
      status: $status
      dateEdited: $dateEdited
      datePublished: $datePublished
      dateCreated: $dateCreated
    )
  }
`

export const GET_USER_OFFERS = gql`
    query allUserOffers(
        $id: ID!
    ) {
        allUserOffers(
            id: $id
        ) {
            id
            title
            message
            user {
                id
                name
                avatar {
                    id
                    name
                    path
                }
            }
            hub {
                id
                title
                color
            }
        }
    }
`

export const AUTH_USER = gql`
    query authUser(
        $name: String
        $email: String
        $password: String!
    ) {
        authUser(
            name: $name
            email: $email
            password: $password
        ) {
            id
            name
            password
            email
            phone
            role
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
            }
            dateLastAuth
            dateRegistration
            isVerifiedEmail
            isVerifiedPhone
            isNotified
        }
    }
`