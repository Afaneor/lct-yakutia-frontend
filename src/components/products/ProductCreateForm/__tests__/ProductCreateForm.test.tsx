import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProductCreateForm } from '../'

test('renders component successfully', () => {
  render(<ProductCreateForm  />)
  const element = screen.getByTestId('test-ProductCreateForm')
  expect(element).toBeInTheDocument()
})