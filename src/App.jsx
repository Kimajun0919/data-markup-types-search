import { useState, useRef, useCallback } from 'react'
import { useData } from './hooks/useData'
import { useFilter } from './hooks/useFilter'
import { useKeyboard } from './hooks/useKeyboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CardGrid from './components/CardGrid'
import DetailPanel from './components/DetailPanel'
import SearchGuide from './components/SearchGuide'
import styles from './App.module.css'

export default function App() {
  const { data, loading, error } = useData()
  const [category, setCategory] = useState('전체')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [focusedProp, setFocusedProp] = useState('')
  const searchRef = useRef(null)

  const filtered = useFilter(data, { category, query })

  const closePanel = useCallback(() => {
    setSelected(null)
    setFocusedProp('')
  }, [])
  const focusSearch = useCallback(() => searchRef.current?.focus(), [])
  const openItem = useCallback((item, prop = '') => {
    setSelected(item)
    setFocusedProp(prop)
  }, [])

  useKeyboard({ closePanel, focusSearch })

  const totalProps = data.reduce((acc, d) => acc + d.properties.length, 0)

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>데이터 로딩 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.loading}>
        <p style={{ color: 'var(--red)' }}>⚠ {error}</p>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Header totalTypes={data.length} totalProps={totalProps} />

      <div className={styles.layout}>
        <Sidebar
          data={data}
          category={category}
          query={query}
          onCategory={setCategory}
          onQuery={setQuery}
          searchRef={searchRef}
        />
        <main className={styles.main}>
          <SearchGuide
            data={data}
            category={category}
            query={query}
            onSelect={openItem}
          />
          <CardGrid
            items={filtered}
            total={data.length}
            onSelect={openItem}
          />
        </main>
      </div>

      {selected && (
        <DetailPanel
          item={selected}
          onClose={closePanel}
          initialPropQuery={focusedProp}
          highlightedProp={focusedProp}
        />
      )}
    </div>
  )
}
