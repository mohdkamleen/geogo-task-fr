import React from 'react';
import { Header } from 'antd/es/layout/layout'
import { DeleteOutlined, DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, message, Popconfirm, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
const items = [
  {
    key: 'profile',
    label: (
      <Space onClick={() => message.warning("Comming soon!")}>Profile</Space>
    ),
    icon: <UserOutlined />
  },
  {
    key: 'deleteAccount',
    label: "Delete Accout",
    icon: <DeleteOutlined />,
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: <Popconfirm
      title="Logout Account"
      placement='rightbottom'
      description="Are you sure to logout your account?"
      onConfirm={() => localStorage.removeItem("user") || window.location.reload()}
      okText="Yes"
      cancelText="No"
    >
      Logout
    </Popconfirm>,
    icon: <LogoutOutlined />
  },
];

const AdminHeader = () => {
  const navigate = useNavigate()
  return (
    <>

      {/* header part of home page  */}
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(200,200,200,.2)" }}>
        <img onClick={() => navigate("/")} src="https://cms.geogo.in/wp-content/uploads/2021/02/geogo-logo-1.png" width={100} />
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              {JSON.parse(localStorage.getItem("user")).username}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>

    </>
  )
}

export default AdminHeader