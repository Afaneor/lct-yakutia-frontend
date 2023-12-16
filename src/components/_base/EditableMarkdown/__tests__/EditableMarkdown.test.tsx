import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { EditableMarkdown } from '../'

test('renders component successfully', () => {
  render(<EditableMarkdown  />)
  const element = screen.getByTestId('test-EditableMarkdown')
  expect(element).toBeInTheDocument()
})