import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { LoadDataModal } from '../'

test('renders component successfully', () => {
  render(<LoadDataModal  />)
  const element = screen.getByTestId('test-LoadDataModal')
  expect(element).toBeInTheDocument()
})