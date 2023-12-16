import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { PersonalOfferText } from '../'

test('renders component successfully', () => {
  render(<PersonalOfferText  />)
  const element = screen.getByTestId('test-PersonalOfferText')
  expect(element).toBeInTheDocument()
})