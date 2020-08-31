import React from 'react'
import Mutation from '../ui/Mutation'
import Row from '../ui/Row'
import Container from '../ui/Container'
import Message from '../ui/Message'
import Button from '../ui/Button'

export default ({ entry, query, hideModal }) => {
    return (
        <Container>
            <Message text="Are you sure you want to delete this article?" padding />
            <Row type="flex">
                <Button options={{
                    state: 'inactive',
                    classNames: 'grow',
                    handler: () => {
                        hideModal()
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
                                await action({
                                    variables: { id: [entry.id] }
                                })
                                hideModal()
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