import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { NavLinkCard } from '../'

test('renders component successfully', () => {
  render(<NavLinkCard title='title' to='to' />)
  const element = screen.getByTestId('test-NavLinkCard')
  expect(element).toBeInTheDocument()
})
