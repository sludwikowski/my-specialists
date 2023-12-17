import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Star from './Star'
import Navigation from './Navigation'
import { RootState } from '../../app/store'
import { addRating } from '../../features/ratingSlice'
import { CardProps } from '../../types'

export default function CardContent({ id, name, specialization, avatar }: CardProps) {
  const dispatch = useDispatch()
  const totalRatings = useSelector((state: RootState) => state.rating?.totalRatings?.[id] || 0)
  const numRatings = useSelector((state: RootState) => state.rating?.numRatings?.[id] || 0)

  const average = useMemo(() => (numRatings ? totalRatings / numRatings : 0), [totalRatings, numRatings])

  const [selectedStars, setSelectedStars] = useState(Array(5).fill(false))

  const handleClick = (index: number) => {
    const newSelectedStars = selectedStars.map((_, i) => i <= index)
    setSelectedStars(newSelectedStars)
    dispatch(addRating({ id, rating: index + 1 }))
  }

  return (
    <>
      <section className="avatar-container">
        <img src={avatar} alt="Avatar" className="avatar" />
      </section>
      <header>
        <h4>{name}</h4>
        <p>{specialization}</p>
      </header>
      <Navigation />
      <article className="rating-section">
        <aside className="stars">
          {selectedStars.map((isSelected, index) => (
            <div onClick={() => handleClick(index)} key={index}>
              <Star selected={isSelected} />
            </div>
          ))}
        </aside>
        <aside className="rating-info">
          <h3>{average.toFixed(1)}</h3>
          <span>({numRatings} ocen)</span>
        </aside>
      </article>
    </>
  )
}
