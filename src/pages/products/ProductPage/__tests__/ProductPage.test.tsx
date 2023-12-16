import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProductPage } from '../index'

test('renders component successfully', () => {
  render(<ProductPage />)
  const element = screen.getByTestId('test-ProductPage')
  expect(element).toBeInTheDocument()
})
