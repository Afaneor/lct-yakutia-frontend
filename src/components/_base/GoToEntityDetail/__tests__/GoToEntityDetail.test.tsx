import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { GoToEntityDetail } from '../'

test('renders component successfully', () => {
  render(<GoToEntityDetail  />)
  const element = screen.getByTestId('test-GoToEntityDetail')
  expect(element).toBeInTheDocument()
})