import { useState, useMemo } from 'react'
import { REQ_STYLE } from '../constants/categories'
import styles from './PropTable.module.css'

const FILTERS = ['전체', '필수', '권장', '선택']

export default function PropTable({ properties }) {
  const [filter, setFilter] = useState('전체')
  const [propSearch, setPropSearch] = useState('')

  const filtered = useMemo(() => {
    let list = filter === '전체' ? properties : properties.filter(p => p.required === filter)
    if (propSearch.trim()) {
      const q = propSearch.toLowerCase()
      list = list.filter(p =>
        p.prop.toLowerCase().includes(q) ||
        p.note.toLowerCase().includes(q) ||
        p.dbColumn.toLowerCase().includes(q)
      )
    }
    return list
  }, [properties, filter, propSearch])

  const counts = useMemo(() => {
    const c = { 전체: properties.length }
    properties.forEach(p => { c[p.required] = (c[p.required] || 0) + 1 })
    return c
  }, [properties])

  return (
    <div>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className={styles.filterCount}>{counts[f] || 0}</span>
            </button>
          ))}
        </div>
        <input
          className={styles.propSearch}
          type="text"
          placeholder="속성명·비고 검색..."
          value={propSearch}
          onChange={e => setPropSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>속성</th>
              <th>타입</th>
              <th>필수여부</th>
              <th>DB 컬럼</th>
              <th>데이터형식</th>
              <th>비고</th>
              <th>예시값</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.noResult}>해당 조건의 속성이 없습니다.</td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <PropRow key={`${p.prop}-${i}`} prop={p} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PropRow({ prop: p }) {
  const reqStyle = REQ_STYLE[p.required] || {}
  return (
    <tr className={styles.row}>
      <td><span className={styles.propName}>{p.prop}</span></td>
      <td><span className={styles.propType}>{p.type}</span></td>
      <td>
        <span
          className={styles.reqBadge}
          style={{ background: reqStyle.bg, color: reqStyle.color }}
        >
          {p.required}
        </span>
      </td>
      <td><span className={styles.dbCol}>{p.dbColumn}</span></td>
      <td><span className={styles.propType}>{p.dataType}</span></td>
      <td className={styles.note}>{p.note}</td>
      <td><span className={styles.example}>{p.example}</span></td>
    </tr>
  )
}
