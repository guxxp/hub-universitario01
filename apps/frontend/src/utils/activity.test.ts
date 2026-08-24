import { filterActivities } from './activity'
import { activity } from '../test/fixtures'

describe('filterActivities', () => {
  const mockActivities = [
    activity({ id: 1, title: 'Workshop 1', category: 'WORKSHOP', capacity: 30, registeredCount: 26 }), // Com vagas (26 < 30)
    activity({ id: 2, title: 'Workshop 2', category: 'WORKSHOP', capacity: 20, registeredCount: 20 }), // Cheia (20 >= 20)
    activity({ id: 3, title: 'Palestra 1', category: 'LECTURE', capacity: 50, registeredCount: 50 }),  // Cheia (50 >= 50)
    activity({ id: 4, title: 'Palestra 2', category: 'LECTURE', capacity: 50, registeredCount: 10 }),  // Com vagas (10 < 50)
    activity({ id: 5, title: 'Evento 1', category: 'EVENT', capacity: 100, registeredCount: 99 }),     // Com vagas (99 < 100)
    activity({ id: 6, title: 'Evento 2', category: 'EVENT', capacity: 15, registeredCount: 18 }),      // Cheia (18 >= 15)
  ]

  it('returns all activities when category is ALL and availability is ALL', () => {
    expect(filterActivities(mockActivities, 'ALL', 'ALL')).toEqual(mockActivities)
  })

  it('returns only activities with available spots when availability is AVAILABLE', () => {
    const result = filterActivities(mockActivities, 'ALL', 'AVAILABLE')
    expect(result).toEqual([mockActivities[0], mockActivities[3], mockActivities[4]])
  })

  it('returns only full activities when availability is FULL', () => {
    const result = filterActivities(mockActivities, 'ALL', 'FULL')
    expect(result).toEqual([mockActivities[1], mockActivities[2], mockActivities[5]])
  })

  it('correctly classifies 20/20 as full and 26/30 as available', () => {
    const fullActivity = activity({ id: 20, capacity: 20, registeredCount: 20 })
    const availableActivity = activity({ id: 26, capacity: 30, registeredCount: 26 })
    const list = [fullActivity, availableActivity]

    expect(filterActivities(list, 'ALL', 'AVAILABLE')).toEqual([availableActivity])
    expect(filterActivities(list, 'ALL', 'FULL')).toEqual([fullActivity])
  })

  it('filters by category and availability combined (e.g. WORKSHOP + AVAILABLE)', () => {
    const result = filterActivities(mockActivities, 'WORKSHOP', 'AVAILABLE')
    expect(result).toEqual([mockActivities[0]])
  })

  it('filters by category and availability combined (e.g. WORKSHOP + FULL)', () => {
    const result = filterActivities(mockActivities, 'WORKSHOP', 'FULL')
    expect(result).toEqual([mockActivities[1]])
  })

  it('filters by category and availability combined (e.g. LECTURE + AVAILABLE)', () => {
    const result = filterActivities(mockActivities, 'LECTURE', 'AVAILABLE')
    expect(result).toEqual([mockActivities[3]])
  })

  it('filters by category and availability combined (e.g. LECTURE + FULL)', () => {
    const result = filterActivities(mockActivities, 'LECTURE', 'FULL')
    expect(result).toEqual([mockActivities[2]])
  })

  it('returns empty array when no activity matches combined filters', () => {
    const result = filterActivities(mockActivities, 'COURSE', 'AVAILABLE')
    expect(result).toEqual([])
  })

  it('returns only CLOSED activities when availability is CLOSED', () => {
    const mixedActivities = [
      activity({ id: 1, title: 'Ativa 1', status: 'OPEN' }),
      activity({ id: 2, title: 'Lotada 1', status: 'FULL' }),
      activity({ id: 3, title: 'Encerrada 1', status: 'CLOSED' }),
    ]

    const result = filterActivities(mixedActivities, 'ALL', 'CLOSED')
    expect(result).toEqual([mixedActivities[2]])
  })

  it('filters out CLOSED activities from AVAILABLE and FULL', () => {
    const mixedActivities = [
      activity({ id: 1, title: 'Ativa', status: 'OPEN', capacity: 30, registeredCount: 20 }),
      activity({ id: 2, title: 'Encerrada com vagas', status: 'CLOSED', capacity: 30, registeredCount: 20 }),
      activity({ id: 3, title: 'Cheia', status: 'OPEN', capacity: 20, registeredCount: 20 }),
      activity({ id: 4, title: 'Encerrada cheia', status: 'CLOSED', capacity: 20, registeredCount: 20 }),
    ]

    expect(filterActivities(mixedActivities, 'ALL', 'AVAILABLE')).toEqual([mixedActivities[0]])
    expect(filterActivities(mixedActivities, 'ALL', 'FULL')).toEqual([mixedActivities[2]])
    expect(filterActivities(mixedActivities, 'ALL', 'CLOSED')).toEqual([
      mixedActivities[1],
      mixedActivities[3],
    ])
  })

  it('filters CLOSED activities combined with category', () => {
    const mixedActivities = [
      activity({ id: 1, category: 'WORKSHOP', status: 'CLOSED' }),
      activity({ id: 2, category: 'LECTURE', status: 'CLOSED' }),
      activity({ id: 3, category: 'WORKSHOP', status: 'OPEN' }),
    ]

    const result = filterActivities(mixedActivities, 'WORKSHOP', 'CLOSED')
    expect(result).toEqual([mixedActivities[0]])
  })
})


