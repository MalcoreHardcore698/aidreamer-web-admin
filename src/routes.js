import React from 'react'
import Home from './components/Home'
import Users from './components/Users'
import Posts from './components/Posts'
import Acts from './components/Acts'
import Hubs from './components/Hubs'
import Tours from './components/Tours'
import Chats from './components/Chats'
import Images from './components/Images'
import Avatars from './components/Avatars'
import Icons from './components/Icons'
import Pets from './components/Pets'
import Roles from './components/Roles'
import Languages from './components/Languages'

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
        path: '/posts',
        component: ({ showModal, hideModal }) => <Posts showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/hubs',
        component: ({ showModal, hideModal }) => <Hubs showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/chats',
        component: ({ showModal, hideModal }) => <Chats showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/tours',
        component: ({ showModal, hideModal }) => <Tours showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/acts',
        component: ({ showModal, hideModal }) => <Acts showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/pets',
        component: ({ showModal, hideModal }) => <Pets showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/roles',
        component: ({ showModal, hideModal }) => <Roles showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/images',
        component: ({ showModal, hideModal }) => <Images showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/avatars',
        component: ({ showModal, hideModal }) => <Avatars showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/icons',
        component: ({ showModal, hideModal }) => <Icons showModal={showModal} hideModal={hideModal} />
    },
    {
        exact: true,
        path: '/languages',
        component: ({ showModal, hideModal }) => <Languages showModal={showModal} hideModal={hideModal} />
    }
]