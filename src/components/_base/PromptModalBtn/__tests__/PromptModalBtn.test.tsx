import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { PromptModalBtn } from '../'

test('renders component successfully', () => {
  render(<PromptModalBtn  />)
  const element = screen.getByTestId('test-PromptModalBtn')
  expect(element).toBeInTheDocument()
})