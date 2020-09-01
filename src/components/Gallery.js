import React from 'react'
import Row from './ui/Row'
import Headline from './ui/Headline'
import './styles/Table.css'

export default () => {
    return (
        <main className="home">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Gallery</span>
                        <span>Manage</span>
                    </Headline>
                </Row>
            </aside>
        </main>
    )
}