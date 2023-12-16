import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { MoreBtn } from '../'

test('renders component successfully', () => {
  render(<MoreBtn  />)
  const element = screen.getByTestId('test-MoreBtn')
  expect(element).toBeInTheDocument()
})