import { useMemo } from 'react'

export function useFilter(data, { category, query }) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()

    return data.filter(d => {
      const matchCat = category === '전체' || d.category === category

      if (!matchCat) return false
      if (!q) return true

      return (
        d.name.toLowerCase().includes(q) ||
        d.schemaType.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.properties.some(
          p =>
            p.prop.toLowerCase().includes(q) ||
            p.note.toLowerCase().includes(q) ||
            p.dbColumn.toLowerCase().includes(q) ||
            p.example.toLowerCase().includes(q)
        )
      )
    })
  }, [data, category, query])
}
