import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Navigation from './Navigation'

describe('Navigation', () => {
  it('renders three buttons', () => {
    const { getAllByRole } = render(<Navigation />)

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('changes hoveredIndex state on mouse enter and leave', () => {
    const { getAllByRole } = render(<Navigation />)

    const buttons = getAllByRole('button')

    fireEvent.mouseEnter(buttons[0])
    expect(buttons[0].closest('nav')).toHaveClass('hovered-0')

    fireEvent.mouseLeave(buttons[0])
    expect(buttons[0].closest('nav')).not.toHaveClass('hovered-0')
  })
})
