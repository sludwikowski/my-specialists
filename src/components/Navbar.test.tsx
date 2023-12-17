/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders Navbar component', () => {
    const mockSetTab = jest.fn()
    const { container } = render(
      <Navbar
        tab="all"
        data={[]}
        mySpecialists={[]}
        setTab={mockSetTab}
        inputValue=""
        handleSearchChange={() => {}}
      />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('calls setTab with "all" when All favorite button is clicked', () => {
    const mockSetTab = jest.fn()
    const { getByText } = render(
      <Navbar
        tab="all"
        data={[]}
        mySpecialists={[]}
        setTab={mockSetTab}
        inputValue=""
        handleSearchChange={() => {}}
      />
    )

    fireEvent.click(getByText('All favorite'))
    expect(mockSetTab).toHaveBeenCalledWith('all')
  })

  it('calls setTab with "my" when My specialists button is clicked', () => {
    const mockSetTab = jest.fn()
    const { getByText } = render(
      <Navbar
        tab="all"
        data={[]}
        mySpecialists={[]}
        setTab={mockSetTab}
        inputValue=""
        handleSearchChange={() => {}}
      />
    )

    fireEvent.click(getByText('My specialists'))
    expect(mockSetTab).toHaveBeenCalledWith('my')
  })
})
