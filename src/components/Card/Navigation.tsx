import React from 'react'
import { Bell, Calendar, Mail } from 'lucide-react'

// eslint-disable-next-line react/jsx-key
const navIcons = [<Bell />, <Calendar />, <Mail />]

export default function Navigation() {
  return (
    <nav className="container">
      <ul className="card-header">
        {navIcons.map((icon, index) => (
          <li key={index}>
            <button className="btn">{icon}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
