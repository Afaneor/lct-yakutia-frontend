import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { SalesChannelsPage } from '../index'

test('renders component successfully', () => {
  render(<SalesChannelsPage />)
  const element = screen.getByTestId('test-SalesChannelsPage')
  expect(element).toBeInTheDocument()
})
