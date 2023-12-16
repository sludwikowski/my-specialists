import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window'

import { selectData } from '../features/dataSlice'
import { RootState, AppDispatch } from '../app/store'
import { setSearch } from '../features/searchSlice'
import Card from './Card/Card'
import { icons } from './icon/Icons'

export interface Specialist {
  id: number
  name: string
  specialization: string
  avatar: string
}

export default function List() {
  const dispatch: AppDispatch = useDispatch()
  const data = useSelector((state: RootState) => selectData(state))
  const search: string = useSelector((state: RootState) => state.search.value)
  const [inputValue, setInputValue] = useState('')

  const [tab, setTab] = useState<'all' | 'my'>('all') // Nowy stan dla zakładki
  const mySpecialists: Specialist[] = useSelector((state: RootState) => state.mySpecialists.value) // Pobieramy listę "My Specialists" ze store Redux

  const rowHeight = 442
  const padding = 20

  const debouncedDispatch = _.debounce((searchValue: string) => {
    if (searchValue.length >= 3 || searchValue === '') {
      dispatch(setSearch(searchValue))
    }
  }, 300)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    setInputValue(searchValue)
    debouncedDispatch(searchValue)
  }

  const filteredData = useMemo<Specialist[]>(() => {
    const specialists = tab === 'all' ? data : mySpecialists // Wybieramy dane na podstawie wybranej zakładki

    return specialists
      .filter(
        (item: Specialist) =>
          item.name.toLowerCase().startsWith(search.toLowerCase()) ||
          item.specialization.toLowerCase().startsWith(search.toLowerCase())
      )
      .sort((a: Specialist, b: Specialist) => a.specialization.localeCompare(b.specialization))
  }, [data, search, mySpecialists, tab]) // Dodajemy mySpecialists i tab do listy zależności

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
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
        <h3>Favorite specialists ({tab === 'all' ? data.length : mySpecialists.length})</h3>{' '}
        <div>
          <button style={{ padding: '10px 40px', width: '200px' }} onClick={() => setTab('all')}>
            All favorite
          </button>
          <button style={{ padding: '10px 40px', width: '200px' }} onClick={() => setTab('my')}>
            My specialists
          </button>
        </div>
        <form className="nosubmit">
          <div style={{ position: 'relative' }}>
            <input
              className="nosubmit"
              type="search"
              placeholder="Search..."
              style={{ paddingLeft: '30px' }}
              value={inputValue}
              onChange={handleSearchChange}
            />
            <img
              src={icons.search}
              alt="search"
              style={{ position: 'absolute', left: '4px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </form>
      </header>
      <section style={{ height: '900px', width: '100%' }}>
        <Grid
          columnCount={3}
          columnWidth={400}
          height={900}
          rowCount={Math.ceil(filteredData.length / 3)}
          rowHeight={rowHeight + padding}
          width={1200}>
          {cardRenderer}
        </Grid>
      </section>
    </main>
  )
}
