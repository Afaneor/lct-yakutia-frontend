import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProjectCreateModal } from '../index'

test('renders component successfully', () => {
  render(<ProjectCreateModal />)
  const element = screen.getByTestId('test-ProjectCreateModal')
  expect(element).toBeInTheDocument()
})
