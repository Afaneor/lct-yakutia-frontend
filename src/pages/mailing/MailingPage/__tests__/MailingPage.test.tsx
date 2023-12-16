import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { MailingPage } from '../index'

test('renders component successfully', () => {
  render(<MailingPage />)
  const element = screen.getByTestId('test-MailingPage')
  expect(element).toBeInTheDocument()
})
