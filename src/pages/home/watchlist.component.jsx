import { HeartOutlined } from '@ant-design/icons'
import { Button, Drawer, Empty, Space, Spin } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClearWatchList } from '../../redux/slice/movie'
import MovieCard from './movie.component'

const Watchlist = ({ onClose }) => {
    const { watchList: wl, loading } = useSelector(state => state.movie)
    const dispatch = useDispatch()
    return (
        <div>
            <Drawer
                open
                headerStyle={{ display: "none" }}
                onClose={onClose}>
                <h3>Watch Lists <HeartOutlined /></h3>
                <Space>
                    <Button onClick={onClose}> Close </Button>
                   {wl?.length > 0 && <Button danger onClick={() => dispatch(ClearWatchList())}> Clear </Button>}
                </Space> <br /><br />

                {
                    wl?.length > 0
                        ? wl.map((e, i) => (
                            <>
                            <MovieCard data={e} key={i} /><br />
                            </>
                        )) : <Spin spinning={loading} tip="Loading..." >
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Spin>
                }

            </Drawer>
        </div>
    )
}

export default Watchlist