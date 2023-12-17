import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { CsvForm } from '../'

test('renders component successfully', () => {
  render(<CsvForm  />)
  const element = screen.getByTestId('test-CsvForm')
  expect(element).toBeInTheDocument()
})