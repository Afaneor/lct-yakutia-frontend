import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { InputJson } from '../'

test('renders component successfully', () => {
  render(<InputJson  />)
  const element = screen.getByTestId('test-InputJSON')
  expect(element).toBeInTheDocument()
})