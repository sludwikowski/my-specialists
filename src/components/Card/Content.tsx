// CardContent.tsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Star from './Star'
import Navigation from './Navigation'
import { RootState } from '@src/app/store'
import { addRating } from '@src/features/ratingSlice'

interface CardContentProps {
  id: number
  name: string
  title: string
  avatar: string
}

export default function CardContent({ id, name, title, avatar }: CardContentProps) {
  const dispatch = useDispatch()
  const totalRatings = useSelector((state: RootState) => state.rating.totalRatings[id] || 0)
  const numRatings = useSelector((state: RootState) => state.rating.numRatings[id] || 0)
  const average = numRatings ? totalRatings / numRatings : 0

  const [selectedStars, setSelectedStars] = useState([false, false, false, false, false])

  const handleClick = (index: number) => {
    const newSelectedStars = selectedStars.map((_, i) => i <= index)
    setSelectedStars(newSelectedStars)
    dispatch(addRating({ id, rating: index + 1 }))
  }

  return (
    <>
      <div className="avatar-container">
        <img src={avatar} alt="Avatar" className="avatar" />
      </div>
      <header>
        <h4>{name}</h4>
        <p>{title}</p>
      </header>
      <Navigation />
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
          <h3>{average.toFixed(1)}</h3>
          <span>({numRatings} ocen)</span>
        </div>
      </section>
    </>
  )
}
