import React from 'react'
import styles from './NavLinkCard.module.scss'
import { FCC } from 'src/types'
import { NavLink } from 'react-router-dom'
import { Button, Card } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

interface NavLinkCardProps {
  icon?: React.ReactNode
  title: string
  to: string
}
export const NavLinkCard: FCC<NavLinkCardProps> = ({ icon, title, to }) => {
  return (
    <NavLink to={to}>
      <Button size='large' icon={icon}>
        {title}
        <ArrowRightOutlined />
      </Button>
    </NavLink>
  )
}

NavLinkCard.displayName = 'NavLinkCard'

export default NavLinkCard
