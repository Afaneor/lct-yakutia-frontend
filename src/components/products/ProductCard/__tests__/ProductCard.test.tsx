import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProductCard } from '../'

test('renders component successfully', () => {
  render(<ProductCard  />)
  const element = screen.getByTestId('test-ProductCard')
  expect(element).toBeInTheDocument()
})