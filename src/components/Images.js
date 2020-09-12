import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'

import Query from './ui/Query'
import Subscription from './ui/Subscription'
import Table from './ui/Table'
import Row from './ui/Row'
import Button from './ui/Button'
import Headline from './ui/Headline'

import AddImage from './content/AddImage'
import EditImage from './content/EditImage'
import DeleteEntries from './content/DeleteEntries'

import { GET_ALL_IMAGES, SUB_ALL_IMAGES, DELETE_IMAGES } from '../utils/queries'

import './styles/Table.css'

export default ({ showModal }) => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Gallery</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Query query={GET_ALL_IMAGES}>
                    {({ data, refetch }) => (
                        <Subscription query={SUB_ALL_IMAGES} refetch={refetch}>
                            {({ subData }) => (
                                <Table options={{
                                    data: ((subData && subData.images) || data.allImages),
                                    dataTable: ((subData && subData.images) || data.allImages).map(image => ([
                                        { header: 'ID', value: image.id, type: 'text', visible: false },
                                        { header: 'Изображение', value: image.path, type: 'img' },
                                        { header: 'Название', value: image.name, type: 'text' },
                                        { header: 'Путь', value: image.path, type: 'text' },
                                        { header: 'Дата изменения', value: <Moment date={new Date(new Date().setTime(image.updatedAt))} format="DD.MM.YYYY" />, type: 'text', visible: false },
                                        { header: 'Дата создания', value: <Moment date={new Date(new Date().setTime(image.createdAt))} format="DD.MM.YYYY" />, type: 'text' }
                                    ])),
                                    actions: [
                                        ({ table, dishands }) => (
                                            <Button options={{
                                                state: (dishands) ? 'disable icon inactive' : 'active icon',
                                                disabled: dishands,
                                                classNames: 'stretch',
                                                handler: () => {
                                                    showModal([
                                                        {
                                                            path: '/',
                                                            title: 'Delete Offer',
                                                            component: ({ close }) => <DeleteEntries
                                                                query={DELETE_IMAGES}
                                                                entries={table.filter(t => t.checked)}
                                                                handler={async (action, entry, entries) => {
                                                                    await action({
                                                                        variables: {
                                                                            id: (entry)
                                                                                ? [{
                                                                                    id: entry.id,
                                                                                    user: entry.user.id
                                                                                }]
                                                                                : entries.map(ent => ent._id)
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
                                            const image = (docs.length === 1) ? docs[0] : false
                                            return (
                                                <Button options={{
                                                    state: (dishands || (!image)) ? 'disable icon inactive' : 'active icon',
                                                    disabled: dishands || (!image),
                                                    classNames: 'stretch',
                                                    handler: () => (image) && showModal([{
                                                        path: '/',
                                                        title: 'Edit Image',
                                                        component: ({ close }) => <EditImage
                                                            image={image}
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
                                                        title: 'Add Image',
                                                        component: ({ close }) => <AddImage
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