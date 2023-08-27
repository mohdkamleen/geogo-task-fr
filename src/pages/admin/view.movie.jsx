import React, { useState } from 'react'
import { StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Drawer, Row, Tag } from 'antd';
const { Meta } = Card;

const ViewMovie = ({ data,onClose }) => { 

    return (
        <> 
            <Drawer
                open
                headerStyle={{ display: "none" }}
                placement="bottom"
                height={"80%"}
                onClose={onClose}
            >
                <Button danger onClick={onClose} style={{ display: "block", margin: "auto", width: "250px" }}> Close </Button> <br />
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
                    <p><b>Tags : </b>{data?.genre.map((e,i) => (<Tag key={i} color="magenta">{e}</Tag>))}</p>
                    <p><b>Description : </b>{data.description}</p>

                </Card>
            </Drawer>
        </>
    )
}

export default ViewMovie