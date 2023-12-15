import React, { useState } from 'react'
import { icons } from '../icon/Icons'
import { Bell, Calendar, Mail } from '../icon/Icon'

interface CardContentProps {
  name: string
  title: string
}
interface StarProps {
  selected: boolean
}

const Star: React.FC<StarProps> = ({ selected }) => {
  const icon = selected ? icons.starBlue : icons.starGray
  return <img src={icon} alt="star" style={{ marginRight: '4px' }} />
}
// eslint-disable-next-line react/jsx-key
const navIcons = [<Bell />, <Calendar />, <Mail />]

export default function CardContent({ name, title }: CardContentProps) {
  const [selectedStars, setSelectedStars] = useState([false, false, false, false, false])

  const handleClick = (index: number) => {
    const newSelectedStars = [...selectedStars]
    newSelectedStars[index] = !newSelectedStars[index]
    setSelectedStars(newSelectedStars)
  }
  return (
    <>
      <div className="avatar-container">
        <img src={icons.avatar} alt="Avatar" className="avatar" />
      </div>
      <header>
        <h4>{name}</h4>
        <p>{title}</p>
      </header>
      <nav className="container">
        <ul className="card-header">
          {navIcons.map((icon, index) => (
            <li key={index}>
              <button className="btn">{icon}</button>
            </li>
          ))}
        </ul>
      </nav>
      <section className="rating-section">
        <div className="stars">
          {' '}
          {selectedStars.map((isSelected, index) => (
            <div onClick={() => handleClick(index)} key={index}>
              <Star selected={isSelected} />
            </div>
          ))}
        </div>
        <div className="rating-info">
          <h3>4.7</h3>
          <span>(11 ocen)</span>
        </div>
      </section>
    </>
  )
}
