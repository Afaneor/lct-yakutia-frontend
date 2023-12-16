import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { Chat } from '../'

test('renders component successfully', () => {
  render(<Chat  />)
  const element = screen.getByTestId('test-Chat')
  expect(element).toBeInTheDocument()
})