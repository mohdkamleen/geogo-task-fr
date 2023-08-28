import { Empty, Input, Segmented, Select, Spin } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MovieCard from './movie.component'
import HomeHeader from './header.component'

const Home = () => {
    const { loading, movie } = useSelector(state => state.movie)
    const [filter, setFilter] = useState("All")
    const [inputFilter, setInputFilter] = useState("")

    return (
        <>

            {/* header part of home page  */}
            <HomeHeader />

            {/* filter part  */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 5%", gap: "20px" }}>
                <Segmented
                    options={["All", "Hollywood", "Bollywood"]}
                    value={filter}
                    onChange={setFilter}
                />
                <Input placeholder='Search name' value={inputFilter} onChange={(e) => setInputFilter(e.target.value)} style={{ width: "250px" }} />
            </div>

            {/* movie container  */}
            <div style={{ margin: "10px 5%", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {
                    movie?.length > 0
                        ? movie
                            .filter(e => e.type === filter || (filter === "All" && e))
                            .filter(e => e.movie_name.toString().toLowerCase().indexOf(inputFilter.toLowerCase()) > -1)
                            .map((e, i) => (
                                <MovieCard data={e} key={i} />
                            )) : <Spin spinning={loading} tip="Loading..." >
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Spin>
                }
            </div> <br />
        </>
    )
}

export default Home