import React from 'react'
import styles from './SourceLink.module.scss'
import { FCC } from 'src/types'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'src/hooks'

interface SourceLinkProps {
  link: string
}
export const SourceLink: FCC<SourceLinkProps> = ({ link }) => {
  const { tF } = useTranslation()

  return (
    <NavLink to={link} target='_blank' rel='noopener noreferrer'>
      <Button
        type={'link'}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        {tF('Источник')}
      </Button>
    </NavLink>
  )
}

SourceLink.displayName = 'SourceLink'

export default SourceLink
