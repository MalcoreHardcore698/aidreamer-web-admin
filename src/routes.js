import React from 'react'
import Home from './components/Home'
import Users from './components/Users'
import Articles from './components/Articles'
import Offers from './components/Offers'
import Hubs from './components/Hubs'
import Tours from './components/Tours'
import Chats from './components/Chats'
import Gallery from './components/Gallery'

export default [
    {
        exact: true,
        path: '/',
        component: ({ showModal, hideModal }) => <Home showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/users',
        component: ({ showModal, hideModal }) => <Users showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/articles',
        component: ({ showModal, hideModal }) => <Articles showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/offers',
        component: ({ showModal, hideModal }) => <Offers showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/hubs',
        component: ({ showModal, hideModal }) => <Hubs showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/tours',
        component: ({ showModal, hideModal }) => <Tours showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/chats',
        component: ({ showModal, hideModal }) => <Chats showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/gallery',
        component: ({ showModal, hideModal }) => <Gallery showModal={showModal} hideModal={hideModal} />
    }
]