import React, { lazy, Suspense } from 'react'
import { FCC } from 'src/types'
import { Button, Card, Spin, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { ProjectsRoutesNames } from 'src/routes/projectsRoutes'
const ReactMarkdown = lazy(() => import('react-markdown'))

const { Title, Paragraph } = Typography

interface ProjectCardProps {
  id: number
  title?: string
  product?: string
  description?: string
  onClick?: () => void
  onDelete?: (id: number) => void
}
export const ProjectCard: FCC<ProjectCardProps> = ({
  id,
  title,
  product,
  description = '',
  onClick,
  onDelete,
}) => {
  return (
    <NavLink to={`/${ProjectsRoutesNames.PROJECTS}/${id}`}>
      <Card
        title={
          <Title level={4} ellipsis>
            {title}
          </Title>
        }
        style={{ width: '100%', marginBottom: 16, height: '350px' }} // Задаем фиксированную высоту
        extra={
          <Button
            type={'text'}
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.preventDefault()
              onDelete?.(id)
            }}
          />
        }
        hoverable
        onClick={onClick}
      >
        <div>
          <Paragraph strong>Тип продукта: </Paragraph>
          <Paragraph>{product}</Paragraph>
          <Paragraph strong>Описание: </Paragraph>
          <Suspense fallback={<Spin spinning />}>
            <Paragraph
              style={{
                overflow: 'scroll',
                height: '150px',
              }}
            >
              <ReactMarkdown>{description}</ReactMarkdown>
            </Paragraph>
          </Suspense>
        </div>
      </Card>
    </NavLink>
  )
}

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
