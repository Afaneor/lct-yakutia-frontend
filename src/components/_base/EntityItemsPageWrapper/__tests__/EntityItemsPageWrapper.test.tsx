import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { EntityItemsPageWrapper } from '../'

test('renders component successfully', () => {
  render(<EntityItemsPageWrapper  />)
  const element = screen.getByTestId('test-EntityItemsPageWrapper')
  expect(element).toBeInTheDocument()
})