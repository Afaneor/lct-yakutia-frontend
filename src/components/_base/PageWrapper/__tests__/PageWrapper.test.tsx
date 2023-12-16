import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { PageWrapper } from '../'

test('renders component successfully', () => {
  render(<PageWrapper  />)
  const element = screen.getByTestId('test-PageWrapper')
  expect(element).toBeInTheDocument()
})