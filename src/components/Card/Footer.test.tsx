import React from 'react'
import { render, screen } from '@testing-library/react'
import CardFooter from './Footer'

describe('CardFooter', () => {
  it('renders two buttons', () => {
    render(<CardFooter />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('renders a profile button', () => {
    render(<CardFooter />)

    const profileButton = screen.getByRole('button', { name: /profil/i })
    expect(profileButton).toBeInTheDocument()
  })

  it('renders a book a visit button', () => {
    render(<CardFooter />)

    const bookVisitButton = screen.getByRole('button', { name: /book a visit/i })
    expect(bookVisitButton).toBeInTheDocument()
  })
}) // Brakujący nawias
