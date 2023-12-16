import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { GenaPage } from '../index'

test('renders component successfully', () => {
  render(<GenaPage />)
  const element = screen.getByTestId('test-GenaPage')
  expect(element).toBeInTheDocument()
})
