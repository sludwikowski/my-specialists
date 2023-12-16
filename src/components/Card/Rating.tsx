// Rating.tsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Star from './Star'
import { RootState } from '@src/app/store'
import { addRating } from '@src/features/ratingSlice'

interface RatingProps {
  id: number
}

export default function Rating({ id }: RatingProps) {
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
  )
}
