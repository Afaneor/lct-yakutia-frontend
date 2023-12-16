import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { UsersPageActions } from '../'

test('renders component successfully', () => {
  render(<UsersPageActions  />)
  const element = screen.getByTestId('test-UsersPageActions')
  expect(element).toBeInTheDocument()
})