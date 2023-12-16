import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProjectCard } from '../index'

test('renders component successfully', () => {
  render(<ProjectCard />)
  const element = screen.getByTestId('test-ProjectCard')
  expect(element).toBeInTheDocument()
})
