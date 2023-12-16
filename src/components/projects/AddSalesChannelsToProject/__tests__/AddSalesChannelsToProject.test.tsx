import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { AddSalesChannelsToProject } from '../'

test('renders component successfully', () => {
  render(<AddSalesChannelsToProject  />)
  const element = screen.getByTestId('test-AddSalesChannelsToProject')
  expect(element).toBeInTheDocument()
})