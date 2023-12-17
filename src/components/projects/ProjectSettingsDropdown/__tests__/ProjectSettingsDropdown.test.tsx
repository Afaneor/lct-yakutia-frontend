import React from 'react'
import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'
import { ProjectSettingsDropdown } from '../'

test('renders component successfully', () => {
  render(<ProjectSettingsDropdown  />)
  const element = screen.getByTestId('test-ProjectSettingsDropdown')
  expect(element).toBeInTheDocument()
})