import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CardHeader from './Header'

describe('CardHeader', () => {
  it('renders two buttons', () => {
    const { getAllByRole } = render(<CardHeader buttonLeftIcon="Left" buttonRightIcon="Right" />)

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('calls the appropriate function when left button is clicked', () => {
    const onLeftButtonClick = jest.fn()
    const { getByText } = render(
      <CardHeader buttonLeftIcon="Left" buttonRightIcon="Right" onLeftButtonClick={onLeftButtonClick} />
    )

    fireEvent.click(getByText('Left'))
    expect(onLeftButtonClick).toHaveBeenCalled()
  })

  it('calls the appropriate function when right button is clicked', () => {
    const onRightButtonClick = jest.fn()
    const { getByText } = render(
      <CardHeader buttonLeftIcon="Left" buttonRightIcon="Right" onRightButtonClick={onRightButtonClick} />
    )

    fireEvent.click(getByText('Right'))
    expect(onRightButtonClick).toHaveBeenCalled()
  })
})
