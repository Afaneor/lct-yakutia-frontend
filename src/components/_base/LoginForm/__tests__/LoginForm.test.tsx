import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { LoginForm } from '../'

test('renders component successfully', () => {
  render(<LoginForm  />)
  const element = screen.getByTestId('test-LoginForm')
  expect(element).toBeInTheDocument()
})