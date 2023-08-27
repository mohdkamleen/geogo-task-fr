import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'

const HomeHeader = () => {
    return (
        <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(200,200,200,.2)" }}>
            <img src="https://cms.geogo.in/wp-content/uploads/2021/02/geogo-logo-1.png" width={100} />
            <Button href='admin'>Admin</Button>
        </Header>
    )
}

export default HomeHeader