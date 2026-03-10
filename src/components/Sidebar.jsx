import { useRef } from 'react'
import { CATEGORIES } from '../constants/categories'
import styles from './Sidebar.module.css'

export default function Sidebar({ data, category, query, onCategory, onQuery, searchRef }) {
  const counts = {}
  data.forEach(d => { counts[d.category] = (counts[d.category] || 0) + 1 })

  return (
    <aside className={styles.sidebar}>
      {/* Search */}
      <div className={styles.searchBox}>
        <SearchIcon />
        <input
          ref={searchRef}
          className={styles.input}
          type="text"
          value={query}
          onChange={e => onQuery(e.target.value)}
          placeholder="항목명·DB 컬럼·속성명 검색..."
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button className={styles.clear} onClick={() => onQuery('')} aria-label="검색 초기화">
            ×
          </button>
        )}
      </div>

      {/* Categories */}
      <nav className={styles.catList}>
        <div className={styles.sectionLabel}>카테고리</div>
        {CATEGORIES.map(({ key, icon, color }) => {
          const count = key === '전체' ? data.length : (counts[key] || 0)
          if (count === 0 && key !== '전체') return null
          const isActive = category === key
          return (
            <button
              key={key}
              className={`${styles.catBtn} ${isActive ? styles.active : ''}`}
              onClick={() => onCategory(key)}
              style={isActive ? { '--cat-color': color } : {}}
            >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.label}>{key}</span>
              <span className={`${styles.count} ${isActive ? styles.countActive : ''}`}>{count}</span>
            </button>
          )
        })}
      </nav>

      {/* Shortcut hint */}
      <div className={styles.hint}>
        <kbd>⌘K</kbd> 검색&nbsp;&nbsp;<kbd>ESC</kbd> 닫기
      </div>
    </aside>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: 'var(--muted)', flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
