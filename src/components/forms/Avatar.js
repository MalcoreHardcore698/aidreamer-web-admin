import React from 'react'
import Query from '../ui/Query'
import Row from '../ui/Row'
import Form from '../ui/Form'
import Avatar from '../ui/Avatar'
import Toggler from '../ui/Toggler'
import Dropzone from '../ui/Dropzone'
import {
    GET_ALL_RARITIES,
    GET_ALL_HUBS,
    ADD_AVATAR,
    EDIT_AVATAR
} from '../../utils/queries'

export default ({
    document,
    close,
    type,
    add=false,
    edit=false,
    isIcon,
    isRarity,
    isHub
}) => {
    const variablesCompose = (form) => {
        const variables = {
            title: form.title,
            status: form.status || 'PUBLISHED'
        }
        
        if (edit) variables.id = document._id
        if (form.icon) variables.file = form.icon
        if (form.rarity) variables.rarity = form.rarity
        if (form.hub) variables.hub = form.hub

        return variables
    }

    return (
        <Form
            add={add}
            edit={edit}
            query={(add) ? ADD_AVATAR : EDIT_AVATAR}
            variables={(form, options) => variablesCompose(form, options)}
            afterEffect={close}
        >
            {({ register, setValue }) => (
                <React.Fragment>
                    {(isIcon) && <p className="ui-title">Image</p>}
                    {(isIcon) && <Dropzone
                        options={{
                            name: 'icon',
                            accept: 'image/*'
                        }}
                    />}

                    {(isRarity) && <p className="ui-title">Rarity</p>}
                    {(isRarity) && <Query query={GET_ALL_RARITIES}>
                        {({ data }) => (
                            <Toggler options={{
                                name: 'rarity', setValue,
                                register: register(),
                                initialSlicedFactor: 2,
                                initialOptions: data.allRarities.map((item, key) => ({
                                    value: item,
                                    label: (
                                        <Row key={key}>
                                            <p>{item}</p>
                                        </Row>
                                    )}))
                                }}
                            />
                        )}
                    </Query>}
                    
                    {(isHub) && <p className="ui-title">Hub</p>}
                    {(isHub) && <Query query={GET_ALL_HUBS} pseudo={{ height: 45, count: 6 }}>
                        {({ data }) => (
                            <Toggler options={{
                                name: 'hub', setValue,
                                register: register(),
                                initialSlicedFactor: 2,
                                initialOptions: data.allHubs.map(hub => ({
                                    value: hub.id,
                                    label: (
                                        <Row key={hub.id}>
                                            <Avatar avatar={{ path: hub.icon.path }} properties={['circle']} />
                                            <p>{hub.title}</p>
                                        </Row>
                                    )
                                }))
                            }} />
                        )}
                    </Query>}
                </React.Fragment>
            )}
        </Form>
    )
}