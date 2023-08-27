import { DeleteOutlined, EditOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Popconfirm, Segmented, Space, Table, Tag, Tooltip } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMovie } from '../../redux/slice/movie';
import EditMovie from './edit.movie';
import Header from './header.component'
import ViewMovie from './view.movie';

const Admin = () => {
  const { loading, movie } = useSelector(state => state.movie)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState("All")
  const [inputFilter, setInputFilter] = useState("")
  const [movieData, setMovieData] = useState()
  const [editMovie, setEditMovie] = useState()

  const handleDelete = (id) => {
      dispatch(DeleteMovie(id))
  }

  const columns = [
    {
      title: 'Poster',
      dataIndex: "poster",
      key: 'poster',
      render: poster => (<Avatar shape='square' src={poster} style={{ width: "60px", height: "40px" }} />)
    },
    {
      title: 'Movie Name',
      dataIndex: "movie_name",
      key: 'movie_name',
      render: movie_name => movie_name
    },
    {
      title: 'Rating',
      dataIndex: "ratings",
      key: 'ratings',
      render: ratings => (<><StarOutlined /> {ratings}</>)
    },
    {
      title: 'Duration',
      dataIndex: 'runtime',
      key: 'runtime',
      render: runtime => ((runtime - runtime % 60) / 60 < 10 && "0") + (runtime - runtime % 60) / 60 + "h " + runtime % 60 + "m"
    },
    {
      title: "Tags",
      dataIndex: "genre",
      key: "genre",
      render: (genre) => (
        <>
          {genre.map((tag, i) => (
            <Tag key={i} color="blue">
              {tag}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Release Date',
      dataIndex: "release_date",
      key: 'release_date',
      render: release_date => release_date
    },
    {
      title: 'Action',
      key: '_id',
      render: (data) => (<>
        <Button.Group>
          <Button size='small' type='primary' onClick={() => setMovieData(data)}><EyeOutlined /></Button>
          <Button size='small' onClick={() => setEditMovie(data)}><EditOutlined /></Button>
          <Popconfirm
            title="Delete Movie" 
            description={`Are you sure to delete ${data.movie_name}`}
            onConfirm={() => handleDelete(data._id)}
            placement="right"
            okText="Yes"
            cancelText="No"
          >
            <Button size='small' danger ghost><DeleteOutlined /></Button>
          </Popconfirm>
        </Button.Group>
      </>),
    },
  ];

  return (
    <>
      {/* admin header  */}
      <Header />

      {/* filter part  */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 5%", gap: "20px" }}>
        <Segmented
          options={["All", "Hollywood", "Bollywood"]}
          value={filter}
          onChange={setFilter}
        />
        <Space>
          <Input placeholder='Search name' value={inputFilter} onChange={(e) => setInputFilter(e.target.value)} style={{ width: "250px" }} /> &nbsp;
          <Button type='primary'>Create New</Button>
        </Space>
      </div>

      {/* controller part  */}
      <Table
        dataSource={
          movie?.length > 0 && movie
            .filter(e => e.type === filter || (filter === "All" && e))
            .filter(e => e.movie_name.toString().toLowerCase().indexOf(inputFilter.toLowerCase()) > -1)
        }
        columns={columns}
        style={{ margin: "20px 5%" }}
        loading={loading}
      />

      {movieData && <ViewMovie data={movieData} onClose={() => setMovieData()} />}
      {editMovie && <EditMovie data={editMovie} onClose={() => setEditMovie()} />}
    </>
  )
}

export default Admin