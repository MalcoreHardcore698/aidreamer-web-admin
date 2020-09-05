import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import Moment from 'react-moment'

import Query from './ui/Query'
import Subscription from './ui/Subscription'
import Table from './ui/Table'
import Row from './ui/Row'
import Button from './ui/Button'
import Headline from './ui/Headline'

import AddOffer from './content/AddOffer'
import EditOffer from './content/EditOffer'
import DeleteEntries from './content/DeleteEntries'

import { setDocuments } from '../utils/actions'
import { GET_ALL_OFFERS, SUB_ALL_OFFERS, DELETE_OFFERS } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    const dispatch = useDispatch()
    
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Offers</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_OFFERS}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_OFFERS} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.offers) || data.allOffers),
                                    dataTable: ((subData && subData.offers) || data.allOffers).map(offer => ([
                                        { header: 'ID', value: offer.id, type: 'text', visible: false },
                                        { header: 'Заголовок', value: offer.title, type: 'text' },
                                        { header: 'Описание', value: offer.message, type: 'text' },
                                        { header: 'Пользователь', value: offer.user.name, type: 'text' },
                                        { header: 'Сообщество', value: offer.hub.title, type: 'text' },
                                        { header: 'Статус', value: offer.status, type: 'text' },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(offer.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(offer.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
                                    ])),
                                    actions: [
                                        ({ table, dishands }) => (
                                            <Button options={{
                                                state: (dishands) ? 'disable icon inactive' : 'active icon',
                                                disabled: dishands,
                                                classNames: 'stretch',
                                                handler: () => {
                                                    dispatch(setDocuments(table.filter(t => t.checked)))
                                                    showModal([
                                                        {
                                                            path: '/',
                                                            title: 'Delete Offer',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_OFFERS}
                                                                handler={async (action, entry, docs) => {
                                                                    await action({
                                                                        variables: {
                                                                            offers: (entry)
                                                                                ? [{
                                                                                    id: entry.id,
                                                                                    user: entry.user.id
                                                                                }]
                                                                                : docs.map(doc => ({
                                                                                    id: doc.id,
                                                                                    user: doc.user.id
                                                                                }))
                                                                        }
                                                                    })
                                                                }}
                                                                close={close}
                                                            />
                                                        }
                                                    ], true)
                                                }
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        ),
                                        ({ table, dishands }) => {
                                            const docs = table.filter(t => t.checked)
                                            const offer = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!offer)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!offer),
                                                    classNames: 'stretch',
                                                    handler: () => (offer) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Offer',
                                                        component: ({ close }) => <EditOffer
                                                            user
                                                            status
                                                            offer={offer}
                                                            close={close}
                                                        />
                                                    }], true)
                                                }}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                            )
                                        },
                                        () => (
                                            <Button options={{
                                                state: 'icon active',
                                                classNames: 'stretch',
                                                handler: () => showModal([
                                                    {
                                                        path: '/',
                                                        title: 'Add Offer',
                                                        component: ({ close }) => <AddOffer
                                                            user
                                                            status
                                                            close={close}
                                                        />
                                                    }
                                                ], true)
                                            }}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        )
                                    ]
                                }} />
                            )}
                        </Subscription>
                    )}
                </Query>
            </aside>
        </main>
    )
}