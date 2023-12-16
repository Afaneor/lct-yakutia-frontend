import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ChannelActions } from '../'

test('renders component successfully', () => {
  render(<ChannelActions  />)
  const element = screen.getByTestId('test-ChannelActions')
  expect(element).toBeInTheDocument()
})