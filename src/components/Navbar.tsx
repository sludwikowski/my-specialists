import React from 'react'

import { SearchInput } from './Card/SearchInput'
import { CardProps } from '@src/types'

import '../styles/Navbar.scss'

interface NavbarProps {
  tab: 'all' | 'my'
  data: CardProps[]
  mySpecialists: CardProps[]
  setTab: (tab: 'all' | 'my') => void
  inputValue: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Navbar({
  tab,
  data,
  mySpecialists,
  setTab,
  inputValue,
  handleSearchChange,
}: NavbarProps) {
  return (
    <header className="navbar">
      <h3>
        {tab === 'all' ? `Favorite specialists (${data.length})` : `My specialists (${mySpecialists.length})`}
      </h3>
      <nav>
        <ul className="nav__links">
          <li>
            <button className={tab === 'all' ? 'nav-btn' : 'nav-btn'} onClick={() => setTab('all')}>
              All favorite
            </button>
          </li>
          <li>
            <button
              className={tab === 'my' ? 'nav-btn inactive' : 'nav-btn inactive'}
              onClick={() => setTab('my')}>
              My specialists
            </button>
          </li>
        </ul>
      </nav>
      <SearchInput value={inputValue} onChange={handleSearchChange} />
    </header>
  )
}
