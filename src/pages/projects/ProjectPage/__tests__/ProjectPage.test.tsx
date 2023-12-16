import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProjectPage } from '../index'

test('renders component successfully', () => {
  render(<ProjectPage />)
  const element = screen.getByTestId('test-ProjectPage')
  expect(element).toBeInTheDocument()
})
