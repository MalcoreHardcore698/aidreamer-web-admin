import React from 'react'
import { useSelector } from 'react-redux'
import { ResponsiveLine } from '@nivo/line'
import Query from './ui/Query'
import Row from './ui/Row'
import Container from './ui/Container'
import Column from './ui/Column'
import Headline from './ui/Headline'
import {
    GET_STATS
} from '../utils/queries'

const MyResponsiveLine = ({ data }) => (
    <div className="graphic-line">
        <ResponsiveLine
            data={data}
            margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            colors={{ scheme: 'nivo' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            crosshairType="cross"
            motionStiffness={75}
            animate={false}
            useMesh={true}
            legends={[]}
        />
    </div>
)

export default () => {
    const state = useSelector(state => state)

    if (!state.user) return null
    
    return (
        <main className="dashboard">
            <aside>
                <Row type="flex sb">
                    <Headline>
                        <span>Dash</span>
                        <span>Board</span>
                    </Headline>
                </Row>

                <Query query={GET_STATS}>
                    {({ data }) => (
                        <React.Fragment>
                            <Container type="clear statblocks">
                                <Row type="flex statblock red">
                                    <Column>
                                        <p className="value">{data.countUsers}</p>
                                        <p className="legend">users</p>
                                    </Column>
                                </Row>

                                <Row type="flex statblock blue">
                                    <Column>
                                        <p className="value">{data.countPosts}</p>
                                        <p className="legend">posts</p>
                                    </Column>
                                </Row>

                                <Row type="flex statblock orange">
                                    <Column>
                                        <p className="value">{data.countComments}</p>
                                        <p className="legend">comments</p>
                                    </Column>
                                </Row>
                            </Container>

                            <MyResponsiveLine data={[
                                {
                                    "id": "japan",
                                    "color": "hsl(16, 70%, 50%)",
                                    "data": [
                                    {
                                        "x": "plane",
                                        "y": 259
                                    },
                                    {
                                        "x": "helicopter",
                                        "y": 247
                                    },
                                    {
                                        "x": "boat",
                                        "y": 276
                                    },
                                    {
                                        "x": "train",
                                        "y": 149
                                    },
                                    {
                                        "x": "subway",
                                        "y": 48
                                    },
                                    {
                                        "x": "bus",
                                        "y": 272
                                    },
                                    {
                                        "x": "car",
                                        "y": 40
                                    },
                                    {
                                        "x": "moto",
                                        "y": 170
                                    },
                                    {
                                        "x": "bicycle",
                                        "y": 107
                                    },
                                    {
                                        "x": "horse",
                                        "y": 85
                                    },
                                    {
                                        "x": "skateboard",
                                        "y": 197
                                    },
                                    {
                                        "x": "others",
                                        "y": 108
                                    }
                                    ]
                                },
                                {
                                    "id": "norway",
                                    "color": "hsl(163, 70%, 50%)",
                                    "data": [
                                    {
                                        "x": "plane",
                                        "y": 179
                                    },
                                    {
                                        "x": "helicopter",
                                        "y": 287
                                    },
                                    {
                                        "x": "boat",
                                        "y": 9
                                    },
                                    {
                                        "x": "train",
                                        "y": 47
                                    },
                                    {
                                        "x": "subway",
                                        "y": 124
                                    },
                                    {
                                        "x": "bus",
                                        "y": 258
                                    },
                                    {
                                        "x": "car",
                                        "y": 124
                                    },
                                    {
                                        "x": "moto",
                                        "y": 188
                                    },
                                    {
                                        "x": "bicycle",
                                        "y": 247
                                    },
                                    {
                                        "x": "horse",
                                        "y": 104
                                    },
                                    {
                                        "x": "skateboard",
                                        "y": 69
                                    },
                                    {
                                        "x": "others",
                                        "y": 235
                                    }
                                    ]
                                }
                            ]} />
                        </React.Fragment>
                    )}
                </Query>
            </aside>
        </main>
    )
}