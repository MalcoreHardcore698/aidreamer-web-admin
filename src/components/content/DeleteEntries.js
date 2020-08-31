import React from 'react'
import { useSelector } from 'react-redux'
import Mutation from '../ui/Mutation'
import Row from '../ui/Row'
import Container from '../ui/Container'
import Message from '../ui/Message'
import Button from '../ui/Button'

export default ({ entry, query, handler, close }) => {
    const state = useSelector(state => state)
    const docs = (entry) ? 'this' : state.documents.length
    const ents = (docs > 1 && !entry) ? 'entries' : 'entry'

    return (
        <Container>
            <Message text={`Are you sure you want to delete ${docs} ${ents}?`} padding />
            <Row type="flex">
                <Button options={{
                    state: 'inactive',
                    classNames: 'grow',
                    handler: () => {
                        close()
                    }
                }}>
                    <p>No</p>
                </Button>
                <Mutation query={query}>
                    {({ action }) => (
                        <Button options={{
                            state: 'inactive',
                            classNames: 'grow',
                            handler: async () => {
                                await handler(action, entry, state.documents)
                                close()
                            }
                        }}>
                            <p>Yes</p>
                        </Button>
                    )}
                </Mutation>
            </Row>
        </Container>
    )
}