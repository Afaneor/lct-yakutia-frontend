import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { SideBar } from '../'

test('renders component successfully', () => {
  render(<SideBar  />)
  const element = screen.getByTestId('test-SideBar')
  expect(element).toBeInTheDocument()
})