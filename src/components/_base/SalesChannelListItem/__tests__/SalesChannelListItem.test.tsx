import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { SalesChannelListItem } from '../'

test('renders component successfully', () => {
  render(<SalesChannelListItem  />)
  const element = screen.getByTestId('test-SalesChannelListItem')
  expect(element).toBeInTheDocument()
})