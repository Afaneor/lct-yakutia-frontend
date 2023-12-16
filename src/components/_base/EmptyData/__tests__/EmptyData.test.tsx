import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { EmptyData } from '../'

test('renders component successfully', () => {
  render(<EmptyData  />)
  const element = screen.getByTestId('test-EmptyData')
  expect(element).toBeInTheDocument()
})