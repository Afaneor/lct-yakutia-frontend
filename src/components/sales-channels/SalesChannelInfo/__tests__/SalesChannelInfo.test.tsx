import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { SalesChannelInfo } from '../'

test('renders component successfully', () => {
  render(<SalesChannelInfo  />)
  const element = screen.getByTestId('test-SalesChannelInfo')
  expect(element).toBeInTheDocument()
})