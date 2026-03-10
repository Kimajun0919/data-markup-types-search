import Card from './Card'
import styles from './CardGrid.module.css'

export default function CardGrid({ items, total, onSelect }) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyEmoji}>🔍</div>
        <p>검색 결과가 없습니다.</p>
        <p className={styles.emptyHint}>다른 키워드나 카테고리를 시도해보세요.</p>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.meta}>
        <strong>{items.length}</strong> / {total}개 타입
      </div>
      <div className={styles.grid}>
        {items.map(item => (
          <Card key={item.id} item={item} onClick={onSelect} />
        ))}
      </div>
    </div>
  )
}
