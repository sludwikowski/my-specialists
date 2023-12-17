import React, { useState } from 'react'
import { Bell, Calendar, Mail } from 'lucide-react'

const navIcons = [Bell, Calendar, Mail]

export default function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <nav className={`menu ${hoveredIndex !== null ? `hovered-${hoveredIndex}` : ''}`}>
      <ul className="card-header">
        {navIcons.map((Icon, index) => (
          <li key={index}>
            <button
              className="btn"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
              <Icon className="icon-hover" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
