import React from 'react'
import Row from '../ui/Row'
import Container from '../ui/Container'
import Message from '../ui/Message'
import Button from '../ui/Button'

export default ({ text, close }) => {
    return (
        <Container>
            <Message text={text} padding />
            <Row type="flex">
                <Button options={{
                    state: 'inactive',
                    classNames: 'grow',
                    handler: () => {
                        close()
                    }
                }}>
                    <p>OK</p>
                </Button>
            </Row>
        </Container>
    )
}