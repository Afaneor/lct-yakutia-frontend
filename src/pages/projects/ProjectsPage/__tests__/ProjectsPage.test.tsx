import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProjectsPage } from '../index'

test('renders component successfully', () => {
  render(<ProjectsPage />)
  const element = screen.getByTestId('test-ProjectsPage')
  expect(element).toBeInTheDocument()
})
