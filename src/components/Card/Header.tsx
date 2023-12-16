import React from 'react'

interface CardHeaderProps {
  buttonLeftIcon: React.ReactNode
  buttonRightIcon: React.ReactNode
}

export default function CardHeader({ buttonLeftIcon, buttonRightIcon }: CardHeaderProps) {
  return (
    <header className="container card-header">
      <button className="btn">{buttonLeftIcon}</button>
      <button className="btn">{buttonRightIcon}</button>
    </header>
  )
}
