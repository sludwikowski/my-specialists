import React from 'react'
import { icons } from '../icon/Icons'

interface SearchInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <form className="search">
    <input className="search-input" type="search" placeholder="Search..." value={value} onChange={onChange} />
    <img src={icons.search} alt="search" className="search-img" />
  </form>
)
