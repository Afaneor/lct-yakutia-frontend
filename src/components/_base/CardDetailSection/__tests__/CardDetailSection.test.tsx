import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { CardDetailSection } from '../'

test('renders component successfully', () => {
  render(<CardDetailSection  />)
  const element = screen.getByTestId('test-CardDetailSection')
  expect(element).toBeInTheDocument()
})