import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { CurrentUser } from '../'

test('renders component successfully', () => {
  render(<CurrentUser  />)
  const element = screen.getByTestId('test-CurrentUser')
  expect(element).toBeInTheDocument()
})