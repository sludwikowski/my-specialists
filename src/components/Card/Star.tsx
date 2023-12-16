import React from 'react'
import { icons } from '../icon/Icons'

interface StarProps {
  selected: boolean
}

export default function Star({ selected }: StarProps) {
  const icon = selected ? icons.starBlue : icons.starGray
  return <img src={icon} alt="star" className="star" />
}
