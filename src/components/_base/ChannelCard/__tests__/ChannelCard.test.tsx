import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ChannelCard } from '../'

test('renders component successfully', () => {
  render(<ChannelCard  />)
  const element = screen.getByTestId('test-ChannelCard')
  expect(element).toBeInTheDocument()
})