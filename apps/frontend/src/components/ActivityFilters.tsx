import type { AvailabilityFilter, CategoryFilter } from '../types/activity'
import { availabilityLabels, categoryLabels } from '../utils/activity'

export type { AvailabilityFilter, CategoryFilter }

interface ActivityFiltersProps {
  selectedCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  selectedAvailability: AvailabilityFilter
  onAvailabilityChange: (availability: AvailabilityFilter) => void
}

const categories: CategoryFilter[] = ['ALL', 'WORKSHOP', 'LECTURE', 'COURSE', 'EXTENSION_PROJECT', 'EVENT']
const availabilities: AvailabilityFilter[] = ['ALL', 'AVAILABLE', 'FULL', 'CLOSED']

export function ActivityFilters({
  selectedCategory,
  onCategoryChange,
  selectedAvailability,
  onAvailabilityChange,
}: ActivityFiltersProps) {
  return (
    <div className="filters-container">
      <div className="filter-group-wrapper">
        <span className="filter-group-title">Categoria</span>
        <div className="filter-group" role="group" aria-label="Filtrar por categoria">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'filter-active' : ''}
              onClick={() => onCategoryChange(category)}
            >
              {category === 'ALL' ? 'Todas' : categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group-wrapper">
        <span className="filter-group-title">Disponibilidade</span>
        <div className="filter-group" role="group" aria-label="Filtrar por disponibilidade">
          {availabilities.map((availability) => (
            <button
              key={availability}
              type="button"
              className={selectedAvailability === availability ? 'filter-active' : ''}
              onClick={() => onAvailabilityChange(availability)}
            >
              {availabilityLabels[availability]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
