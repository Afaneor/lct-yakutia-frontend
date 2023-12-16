import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProductsPage } from '../index'

test('renders component successfully', () => {
  render(<ProductsPage />)
  const element = screen.getByTestId('test-ProductsPage')
  expect(element).toBeInTheDocument()
})
