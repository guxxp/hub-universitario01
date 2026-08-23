import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ActivityFilters } from './ActivityFilters'

describe('ActivityFilters', () => {
  it('renders category and availability filter buttons', () => {
    render(
      <ActivityFilters
        selectedCategory="ALL"
        onCategoryChange={vi.fn()}
        selectedAvailability="ALL"
        onAvailabilityChange={vi.fn()}
      />
    )

    expect(screen.getByRole('group', { name: 'Filtrar por categoria' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Filtrar por disponibilidade' })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Com vagas' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cheias' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Encerradas' })).toBeInTheDocument()
  })

  it('triggers onAvailabilityChange when an availability option is clicked', async () => {
    const user = userEvent.setup()
    const onAvailabilityChange = vi.fn()

    render(
      <ActivityFilters
        selectedCategory="ALL"
        onCategoryChange={vi.fn()}
        selectedAvailability="ALL"
        onAvailabilityChange={onAvailabilityChange}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Com vagas' }))
    expect(onAvailabilityChange).toHaveBeenCalledWith('AVAILABLE')

    await user.click(screen.getByRole('button', { name: 'Cheias' }))
    expect(onAvailabilityChange).toHaveBeenCalledWith('FULL')

    await user.click(screen.getByRole('button', { name: 'Encerradas' }))
    expect(onAvailabilityChange).toHaveBeenCalledWith('CLOSED')
  })

  it('triggers onCategoryChange when a category option is clicked', async () => {
    const user = userEvent.setup()
    const onCategoryChange = vi.fn()

    render(
      <ActivityFilters
        selectedCategory="ALL"
        onCategoryChange={onCategoryChange}
        selectedAvailability="ALL"
        onAvailabilityChange={vi.fn()}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Workshop' }))
    expect(onCategoryChange).toHaveBeenCalledWith('WORKSHOP')
  })

  it('highlights the active category and availability buttons', () => {
    render(
      <ActivityFilters
        selectedCategory="WORKSHOP"
        onCategoryChange={vi.fn()}
        selectedAvailability="AVAILABLE"
        onAvailabilityChange={vi.fn()}
      />
    )

    const workshopButton = screen.getByRole('button', { name: 'Workshop' })
    const availableButton = screen.getByRole('button', { name: 'Com vagas' })
    const fullButton = screen.getByRole('button', { name: 'Cheias' })

    expect(workshopButton).toHaveClass('filter-active')
    expect(availableButton).toHaveClass('filter-active')
    expect(fullButton).not.toHaveClass('filter-active')
  })
})
