import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { RootError } from '../index'

test('renders component successfully', () => {
  render(<RootError />)
  const element = screen.getByTestId('test-RootError')
  expect(element).toBeInTheDocument()
})
