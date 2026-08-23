import type {
  Activity,
  ActivityCategory,
  ActivityStatus,
  AvailabilityFilter,
  CategoryFilter,
} from '../types/activity'

export const categoryLabels: Record<ActivityCategory, string> = {
  WORKSHOP: 'Workshop',
  LECTURE: 'Palestra',
  COURSE: 'Curso',
  EXTENSION_PROJECT: 'Projeto de extensão',
  EVENT: 'Evento',
}

export const availabilityLabels: Record<AvailabilityFilter, string> = {
  ALL: 'Todas',
  AVAILABLE: 'Com vagas',
  FULL: 'Cheias',
  CLOSED: 'Encerradas',
}

export const statusLabels: Record<ActivityStatus, string> = {
  OPEN: 'Aberta',
  FULL: 'Lotada',
  CLOSED: 'Encerrada',
}

export function formatActivityDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function filterActivities(
  activities: Activity[],
  category: CategoryFilter = 'ALL',
  availability: AvailabilityFilter = 'ALL'
) {
  return activities.filter((a) => {
    if (category !== 'ALL' && a.category !== category) return false

    const isClosed = a.status === 'CLOSED'
    const hasSpots = a.registeredCount < a.capacity

    if (availability === 'AVAILABLE') return !isClosed && hasSpots
    if (availability === 'FULL') return !isClosed && !hasSpots
    if (availability === 'CLOSED') return isClosed
    return true
  })
}
