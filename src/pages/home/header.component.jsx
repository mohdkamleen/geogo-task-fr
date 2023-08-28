import { HeartOutlined } from '@ant-design/icons'
import { Badge, Button, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Watchlist from './watchlist.component'

const HomeHeader = () => {
    const {watchList : wl} = useSelector(state => state.movie)
    const [watchlist, setWatchlist] = useState(false)
    return (
        <>
            <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(200,200,200,.2)" }}>
                <img src="https://cms.geogo.in/wp-content/uploads/2021/02/geogo-logo-1.png" width={100} />
                <Space>
                    <Button href='admin'>Admin</Button>
                    <Badge count={wl?.length}>
                        <Button onClick={() => setWatchlist(true)}><HeartOutlined /></Button>
                    </Badge>
                </Space>
            </Header>
            {/* watchlist shown  */}
            {watchlist && <Watchlist onClose={() => setWatchlist(false)} />}
        </>
    )
}

export default HomeHeader