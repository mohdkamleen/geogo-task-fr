import React, { useState } from 'react'
import { HeartFilled, HeartOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Drawer, Row, Space, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AddWatchList, RemoveWatchList } from '../../redux/slice/movie';
const { Meta } = Card;

const MovieCard = ({ data }) => {
    const { watchList } = useSelector(state => state.movie)
    const [drawer, setDrawer] = useState()
    const dispatch = useDispatch()

    return (
        <> 
            <Card
                style={{
                    width: 300,
                }}
                cover={
                    <img
                        alt="example"
                        src={data.poster}
                    />
                }
                actions={[
                     
                   watchList.map(e => e._id).includes(data._id)
                   ? <HeartFilled key="fheart" onClick={() => dispatch(RemoveWatchList(data._id))} />
                   : <HeartOutlined key="heart" onClick={() => dispatch(AddWatchList(data))} />,
                
                    <span>{((data.runtime - data.runtime % 60) / 60 < 10 && "0") + (data.runtime - data.runtime % 60) / 60 + "h " + data.runtime % 60 + "m"}</span>,
                    <Button onClick={() => setDrawer(data)} size='small' ghost type='primary'>More</Button>,
                ]}
            >
                <Meta
                    title={<Space style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{data.movie_name}</span>
                        <span><StarOutlined key="star" /> {data.ratings}</span>
                    </Space>}
                    description={data.description.substring(0, 50) + " ....... "}
                />
            </Card>

            <Drawer
                open={drawer}
                headerStyle={{ display: "none" }}
                placement="bottom"
                height={"80%"}
                onClose={() => setDrawer()}
            >
                <Button danger onClick={() => setDrawer()} style={{ display: "block", margin: "auto", width: "250px" }}> Close </Button> <br />
                <Card
                    bordered={false}
                    style={{
                        width: "90%",
                        maxWidth: "400px",
                        display: "block",
                        margin: "auto"
                    }}
                    cover={
                        <img
                            alt="example"
                            src={data.poster}
                        />
                    } >

                    <Row>
                        <Col span={12}><StarOutlined key="star" /> {data?.ratings}</Col>
                        <Col span={12} align="right">{((data.runtime - data.runtime % 60) / 60 < 10 && "0") + (data.runtime - data.runtime % 60) / 60 + "h " + data.runtime % 60 + "m"}</Col>
                    </Row>

                    <p><b>Movie : </b> {data.movie_name}</p>
                    <p><b>Release Date : </b>{data.release_date}</p>
                    <p><b>Director : </b>{data.director}</p>
                    <p><b>Producer : </b>{data.producer}</p>
                    <p><b>Tags : </b>{data?.genre.map((e, i) => (<Tag key={i} color="magenta">{e}</Tag>))}</p>
                    <p><b>Description : </b>{data.description}</p>

                </Card>
            </Drawer>
        </>
    )
}

export default MovieCard