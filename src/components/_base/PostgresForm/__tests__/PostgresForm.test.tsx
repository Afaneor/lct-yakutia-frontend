import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { PostgresForm } from '../'

test('renders component successfully', () => {
  render(<PostgresForm  />)
  const element = screen.getByTestId('test-PostgresForm')
  expect(element).toBeInTheDocument()
})