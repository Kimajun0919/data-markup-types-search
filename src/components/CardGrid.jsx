import Card from './Card'
import styles from './CardGrid.module.css'

export default function CardGrid({ items, total, onSelect, activeCategory, query }) {
  if (!activeCategory) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyEmoji}>🧭</div>
        <p>카테고리를 선택하면 타입 목록이 열립니다.</p>
        <p className={styles.emptyHint}>
          먼저 범위를 좁히고, 그 다음 검색어로 속성명이나 DB 컬럼을 찾는 흐름으로 정리했습니다.
        </p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyEmoji}>🔍</div>
        <p>검색 결과가 없습니다.</p>
        <p className={styles.emptyHint}>
          {query
            ? `"${activeCategory}" 안에서 "${query}"와 맞는 타입을 찾지 못했습니다.`
            : `"${activeCategory}" 안에 표시할 타입이 없습니다.`}
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.meta}>
        <span className={styles.scope}>{activeCategory === '전체' ? '전체 보기' : activeCategory}</span>
        <span className={styles.divider}>•</span>
        <strong>{items.length}</strong>
        <span>{activeCategory === '전체' ? ` / ${total}개 타입` : '개 타입'}</span>
      </div>
      <div className={styles.grid}>
        {items.map(item => (
          <Card key={item.id} item={item} onClick={onSelect} />
        ))}
      </div>
    </div>
  )
}
