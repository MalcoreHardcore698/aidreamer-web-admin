import React from 'react'
import Row from './ui/Row'
import Headline from './ui/Headline'
import Message from './ui/Message'
import './styles/Table.css'

export default () => {
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Tours</span>
                        <span>Manage</span>
                    </Headline>
                </Row>

                <Message text="In Development" padding />
            </aside>
        </main>
    )
}