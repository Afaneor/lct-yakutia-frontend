import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { LoadDataComponent } from '../'

test('renders component successfully', () => {
  render(<LoadDataComponent  />)
  const element = screen.getByTestId('test-LoadDataComponent')
  expect(element).toBeInTheDocument()
})