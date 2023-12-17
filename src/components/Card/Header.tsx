import React from 'react'

interface CardHeaderProps {
  buttonLeftIcon: React.ReactNode
  buttonRightIcon: React.ReactNode
  onLeftButtonClick?: () => void
  onRightButtonClick?: () => void
}

export default function CardHeader({
  buttonLeftIcon,
  buttonRightIcon,
  onLeftButtonClick,
  onRightButtonClick,
}: CardHeaderProps) {
  return (
    <header className="container card-header">
      <button className="btn btn-left" onClick={onLeftButtonClick}>
        {buttonLeftIcon}
      </button>
      <button className="btn btn-right" onClick={onRightButtonClick}>
        {buttonRightIcon}
      </button>
    </header>
  )
}
