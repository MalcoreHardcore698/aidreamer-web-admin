import React from 'react'
import { useSelector } from 'react-redux'
import Row from './ui/Row'
import Headline from './ui/Headline'
import Message from './ui/Message'

export default ({ showModal, hideModal }) => {
    const state = useSelector(state => state)

    if (!state.user) return null
    
    return (
        <main className="home">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Dash</span>
                        <span>Board</span>
                    </Headline>
                </Row>

                <Message text="No Content" padding />
            </aside>
        </main>
    )
}