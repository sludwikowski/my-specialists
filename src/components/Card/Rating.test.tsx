import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import { Store } from '@reduxjs/toolkit'

import configureStore from 'redux-mock-store'
import Rating from './Rating'
import { addRating } from '../../features/ratingSlice'

const mockStore = configureStore([])

describe('Rating', () => {
  let store: Store

  beforeEach(() => {
    store = mockStore({
      rating: {
        totalRatings: { 1: 10 },
        numRatings: { 1: 2 },
      },
    })

    store.dispatch = jest.fn()
  })

  it('renders five stars', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <Rating id={1} />
      </Provider>
    )

    const stars = getAllByRole('button')
    expect(stars).toHaveLength(5)
  })

  it('dispatches addRating action on star click', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <Rating id={1} />
      </Provider>
    )

    const stars = getAllByRole('button')

    fireEvent.click(stars[2])
    expect(store.dispatch).toHaveBeenCalledWith(addRating({ id: 1, rating: 3 }))
  })
})
