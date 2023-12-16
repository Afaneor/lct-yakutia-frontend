import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { LoginPage } from '../index'

test('renders component successfully', () => {
  render(<LoginPage  />)
  const element = screen.getByTestId('test-LoginPage')
  expect(element).toBeInTheDocument()
})