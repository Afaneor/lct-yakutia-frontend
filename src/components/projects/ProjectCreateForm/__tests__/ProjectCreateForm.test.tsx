import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProjectCreateForm } from '../index'

test('renders component successfully', () => {
  render(<ProjectCreateForm />)
  const element = screen.getByTestId('test-ProjectCreateForm')
  expect(element).toBeInTheDocument()
})
