import React, { useState } from 'react'
import { StarOutlined } from '@ant-design/icons';
import { Button, Card, Col, Drawer, Input, message, Row, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { UpdateMovie } from '../../redux/slice/movie';


const EditMovie = ({ data, onClose }) => {
    const [formData, setformData] = useState(data)
    const dispatch = useDispatch()
    const handleUpdate = () => {
        if (!formData.poster) return message.warning("Poster is required")
        if (!formData.ratings) return message.warning("Ratings is required")
        if (!formData.runtime) return message.warning("Runtime is required")
        if (!formData.movie_name) return message.warning("Movie name is required")
        if (!formData.release_date) return message.warning("Release date is required")
        if (!formData.director) return message.warning("Director is required")
        if (!formData.producer) return message.warning("Producer is required")
        if (formData.genre.length < 1) return message.warning("Tags are required")
        if (!formData.type) return message.warning("Type is required")
        if (!formData.description) return message.warning("Description is required")
        dispatch(UpdateMovie(formData._id, formData))
        onClose()
    }

    return (
        <>
            <Drawer
                open
                width={400}
                headerStyle={{ display: "none" }}
                onClose={onClose}
            >
                <Button onClick={onClose}> Close </Button> <br /><br />
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
                            src={formData.poster}
                        />
                    } >

                    <p>
                        <b>Poster : </b> (url only)
                        <Input value={formData.poster} onChange={(e) => setformData({ ...formData, poster: e.target.value })} />
                    </p>

                    <Row>
                        <Col span={8}><b>Ratings :</b><Input suffix={<StarOutlined />} value={formData.ratings} onChange={(e) => setformData({ ...formData, ratings: e.target.value })} /></Col>
                        <Col span={8} />
                        <Col span={8} align="right"><b>Duration :</b><Input value={formData.runtime} suffix="m" onChange={(e) => setformData({ ...formData, runtime: e.target.value })} /></Col>
                    </Row>

                    <p><b>Movie Name : </b> <Input value={formData.movie_name} onChange={(e) => setformData({ ...formData, movie_name: e.target.value })} /> </p>
                    <p><b>Release Date : </b><Input value={formData.release_date} onChange={(e) => setformData({ ...formData, release_date: e.target.value })} /> </p>
                    <p><b>Director : </b><Input value={formData.director} onChange={(e) => setformData({ ...formData, director: e.target.value })} /></p>
                    <p><b>Producer : </b><Input.TextArea rows={2} value={formData.producer} onChange={(e) => setformData({ ...formData, producer: e.target.value })} /></p>
                    <p><b>Tags : </b><br />
                        <Select mode='multiple' style={{ width: "100%" }} value={formData.genre} onChange={(e) => setformData({ ...formData, genre: e })}>
                    <Select.Option value="Drama" />
                    <Select.Option value="Romance" />
                    <Select.Option value="Crime" />
                    <Select.Option value="Sci-Fi" />
                    <Select.Option value="Action" />
                    <Select.Option value="Adventure" /> 
                    <Select.Option value="Comedy" />
                        </Select>
                    </p>
                    <p><b>Description : </b><Input.TextArea value={formData.description} onChange={(e) => setformData({ ...formData, description: e.target.value })} rows={5} /></p>

                    <Button type='primary' block onClick={handleUpdate}>Update</Button>

                </Card>
            </Drawer>
        </>
    )
}

export default EditMovie