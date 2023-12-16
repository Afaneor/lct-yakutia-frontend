import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { UsersPage } from '../index'

test('renders component successfully', () => {
  render(<UsersPage />)
  const element = screen.getByTestId('test-UsersPage')
  expect(element).toBeInTheDocument()
})
