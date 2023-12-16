import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { SourceLink } from '../'

test('renders component successfully', () => {
  render(<SourceLink  />)
  const element = screen.getByTestId('test-SourceLink')
  expect(element).toBeInTheDocument()
})