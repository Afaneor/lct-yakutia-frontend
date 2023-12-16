import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { NotFound } from '../'

test('renders component successfully', () => {
  render(<NotFound />)
  const element = screen.getByTestId(/test/i)
  expect(element).toBeInTheDocument()
})
