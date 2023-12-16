import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { StatisticsPage } from '../index'

test('renders component successfully', () => {
  render(<StatisticsPage />)
  const element = screen.getByTestId('test-StatisticsPage')
  expect(element).toBeInTheDocument()
})
