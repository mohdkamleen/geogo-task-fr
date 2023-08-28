import { DeleteOutlined, EditOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Popconfirm, Segmented, Select, Space, Table, Tag } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMovie } from '../../redux/slice/movie';
import AddMovie from './add.movie';
import EditMovie from './edit.movie';
import Header from './header.component'
import ViewMovie from './view.movie';

const Admin = () => {
  const { loading, movie } = useSelector(state => state.movie)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState("All") 
  const [genreFilter, setGenreFilter] = useState([])
  const [movieData, setMovieData] = useState()
  const [editMovie, setEditMovie] = useState()
  const [addMovie, setAddMovie] = useState(false)

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

          <Select mode='multiple' onChange={(e) => setGenreFilter(e)} style={{ minWidth: "200px" }} placeholder="eg. Drama">
            <Select.Option value="Drama" />
            <Select.Option value="Romance" />
            <Select.Option value="Crime" />
            <Select.Option value="Sci-Fi" />
            <Select.Option value="Action" />
            <Select.Option value="Adventure" />
            <Select.Option value="Comedy" />
          </Select> &nbsp;
          <Button type='primary' onClick={() => setAddMovie(true)}>Create New</Button>
        </Space>
      </div>

      {/* controller part  */}
      <Table
        dataSource={
          movie?.length > 0 && movie
            .filter(e => e.type === filter || (filter === "All" && e)) 
            .filter(e => e.genre.some((i, j) => i === genreFilter[j]) || (!genreFilter.length && e))
        }
        columns={columns}
        style={{ margin: "20px 5%" }}
        loading={loading}
      />

      {movieData && <ViewMovie data={movieData} onClose={() => setMovieData()} />}
      {editMovie && <EditMovie data={editMovie} onClose={() => setEditMovie()} />}
      {addMovie && <AddMovie onClose={() => setAddMovie(false)} />}
    </>
  )
}

export default Admin