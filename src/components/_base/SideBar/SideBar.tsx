import React from 'react'
import { FCC } from 'src/types'
import { Layout, Menu, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { CurrentUser } from '../CurrentUser'
const { Sider } = Layout
const { Title } = Typography

interface SideBarProps {
  sideBarItems?: any[]
}
export const SideBar: FCC<SideBarProps> = ({ sideBarItems }) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])

  React.useEffect(() => {
    const path = window.location.pathname
    const route = sideBarItems?.find((route) => path.includes(route.to))
    setSelectedKeys([route?.to])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key])
  }
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid #1f1f1f',
      }}
      collapsible
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div>
          <h1
            style={{
              textAlign: 'center',
              margin: '20px 0',
            }}
          >
            <Title
              level={3}
              style={{
                color: '#fff',
              }}
            >
              GENA
            </Title>
          </h1>
          <Menu
            theme='dark'
            mode='vertical'
            selectedKeys={selectedKeys}
            items={sideBarItems?.map((item: any) => ({
              key: item.to,
              icon: item.icon,
              label: <NavLink to={item.to}>{item.title}</NavLink>,
            }))}
            onClick={handleMenuClick}
          />
        </div>
        <div>
          <CurrentUser />
        </div>
      </div>
    </Sider>
  )
}

SideBar.displayName = 'SideBar'

export default SideBar
