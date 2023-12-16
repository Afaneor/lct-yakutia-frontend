import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { PaginatedTable } from '../'

test('renders component successfully', () => {
  render(<PaginatedTable  />)
  const element = screen.getByTestId('test-PaginatedTable')
  expect(element).toBeInTheDocument()
})