import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { SelectSearchable } from '../'

test('renders component successfully', () => {
  render(<SelectSearchable  />)
  const element = screen.getByTestId('test-SelectSearchable')
  expect(element).toBeInTheDocument()
})