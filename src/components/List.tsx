import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window'

import { selectData } from '../features/dataSlice'
import { RootState, AppDispatch } from '../app/store'
import { setSearch } from '../features/searchSlice'
import Card from './Card/Card'
import { CardProps } from '@src/types'
import { SearchInput } from './Card/SearchInput'

export default function List() {
  const dispatch: AppDispatch = useDispatch()
  const data = useSelector((state: RootState) => selectData(state))
  const search: string = useSelector((state: RootState) => state.search.value)
  const [inputValue, setInputValue] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const columnCount = windowWidth <= 768 ? 1 : 3
  const columnWidth = windowWidth <= 768 ? windowWidth : 400
  const gridWidth = windowWidth > 1200 ? 1200 : windowWidth

  const [tab, setTab] = useState<'all' | 'my'>('all')
  const mySpecialists: CardProps[] = useSelector((state: RootState) => state.mySpecialists.value)

  const rowHeight = 442
  const padding = 20

  const debouncedDispatch = _.debounce((searchValue: string) => {
    if (searchValue.length >= 3 || searchValue === '') {
      dispatch(setSearch(searchValue))
    }
  }, 300)

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value
      setInputValue(searchValue)
      debouncedDispatch(searchValue)
    },
    [setInputValue, debouncedDispatch]
  )

  const filteredData = useMemo<CardProps[]>(() => {
    const specialists = tab === 'all' ? data : mySpecialists

    return specialists
      .filter(
        (item: CardProps) =>
          item.name.toLowerCase().startsWith(search.toLowerCase()) ||
          item.specialization.toLowerCase().startsWith(search.toLowerCase())
      )
      .sort((a: CardProps, b: CardProps) => a.specialization.localeCompare(b.specialization))
  }, [data, search, mySpecialists, tab])

  const cardRenderer = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * 3 + columnIndex

    if (index >= filteredData.length) {
      return null
    }

    const item = filteredData[index]

    return (
      <div
        key={item.id}
        style={{
          ...style,
          height: `calc(100% - ${padding}px)`,
          flex: '33%',
        }}>
        <Card id={item.id} name={item.name} specialization={item.specialization} avatar={item.avatar} />
      </div>
    )
  }

  return (
    <main>
      <header className="header">
        <h3>
          {tab === 'all'
            ? `Favorite specialists (${data.length})`
            : `My specialists (${mySpecialists.length})`}
        </h3>
        <div className="nav__btn-container">
          <button className={tab === 'all' ? 'nav-btn' : 'nav-btn'} onClick={() => setTab('all')}>
            All favorite
          </button>
          <button
            className={tab === 'my' ? 'nav-btn inactive' : 'nav-btn inactive'}
            onClick={() => setTab('my')}>
            My specialists
          </button>
        </div>
        <SearchInput value={inputValue} onChange={handleSearchChange} />
      </header>
      <section>
        <Grid
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={900}
          rowCount={Math.ceil(filteredData.length / columnCount)}
          rowHeight={rowHeight + padding}
          width={gridWidth}>
          {cardRenderer}
        </Grid>
      </section>
    </main>
  )
}
