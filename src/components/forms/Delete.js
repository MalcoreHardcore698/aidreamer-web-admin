import React from 'react'
import Mutation from '../ui/Mutation'
import Row from '../ui/Row'
import Container from '../ui/Container'
import Message from '../ui/Message'
import Button from '../ui/Button'

export default ({ entry, entries, query, handler, close }) => {
    const docs = (entry) ? 'this' : entries.length
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
                    {({ action, loading }) => (
                        <Button options={{
                            state: 'inactive',
                            classNames: 'grow',
                            disabled: loading,
                            handler: async () => {
                                await handler(action, entry, entries)
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