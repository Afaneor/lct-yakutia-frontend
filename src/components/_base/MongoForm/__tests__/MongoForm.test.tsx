import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { MongoForm } from '../'

test('renders component successfully', () => {
  render(<MongoForm  />)
  const element = screen.getByTestId('test-MongoForm')
  expect(element).toBeInTheDocument()
})