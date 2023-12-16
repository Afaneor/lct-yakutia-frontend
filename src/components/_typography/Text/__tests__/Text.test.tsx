import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { Text } from '../'

test('renders component successfully', () => {
  render(<Text  />)
  const element = screen.getByTestId('test-Text')
  expect(element).toBeInTheDocument()
})