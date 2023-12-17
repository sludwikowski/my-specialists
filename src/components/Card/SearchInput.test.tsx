/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SearchInput } from './SearchInput'

describe('SearchInput', () => {
  it('renders an input element', () => {
    const { getByRole } = render(<SearchInput value="" onChange={() => {}} />)

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('calls onChange handler on input change', () => {
    const handleChange = jest.fn()
    const { getByRole } = render(<SearchInput value="" onChange={handleChange} />)

    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(handleChange).toHaveBeenCalled()
  })
})
