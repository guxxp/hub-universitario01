import { useActivities } from '../hooks/useActivities'
import { categoryLabels } from '../utils/activity'
import type { ActivityCategory } from '../types/activity'

export function DashboardPage() {
  const { data: activities = [], isLoading, isError, refetch } = useActivities('')

  if (isLoading) {
    return (
      <main className="page-shell dashboard-page">
        <p className="eyebrow">Visão geral</p>
        <h1>Dashboard</h1>
        <div className="state-card" style={{ marginTop: '32px' }}>
          Carregando indicadores...
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="page-shell dashboard-page">
        <p className="eyebrow">Visão geral</p>
        <h1>Dashboard</h1>
        <div className="state-card error-state" style={{ marginTop: '32px' }}>
          <h3>Não foi possível carregar os indicadores</h3>
          <p>Verifique se a API está em execução e tente novamente.</p>
          <button type="button" onClick={() => refetch()}>
            Tentar novamente
          </button>
        </div>
      </main>
    )
  }

  // Calculations
  const activitiesList = Array.isArray(activities) ? activities : []
  const totalActivities = activitiesList.length
  const openActivities = activitiesList.filter((a) => a.status === 'OPEN').length
  const fullActivities = activitiesList.filter((a) => a.status === 'FULL').length
  const closedActivities = activitiesList.filter((a) => a.status === 'CLOSED').length

  const totalRegistrations = activitiesList.reduce((sum, a) => sum + a.registeredCount, 0)
  const totalSpotsAvailable = activitiesList.reduce((sum, a) => sum + a.remainingSpots, 0)

  const categoriesList: ActivityCategory[] = [
    'WORKSHOP',
    'LECTURE',
    'COURSE',
    'EXTENSION_PROJECT',
    'EVENT',
  ]

  const categoryCounts = categoriesList.reduce((acc, cat) => {
    acc[cat] = activitiesList.filter((a) => a.category === cat).length
    return acc
  }, {} as Record<ActivityCategory, number>)

  const getPercentage = (count: number) => {
    if (totalActivities === 0) return 0
    return Math.round((count / totalActivities) * 100)
  }

  return (
    <main className="page-shell dashboard-page">
      <p className="eyebrow">Visão geral</p>
      <h1>Dashboard</h1>

      {/* KPI Cards Grid */}
      <div className="dashboard-grid">
        <div className="kpi-card">
          <div className="kpi-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="kpi-content">
            <p className="kpi-title">Total de Atividades</p>
            <h2 className="kpi-value">{totalActivities}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="kpi-content">
            <p className="kpi-title">Total de Inscrições</p>
            <h2 className="kpi-value">{totalRegistrations}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div className="kpi-content">
            <p className="kpi-title">Vagas Disponíveis</p>
            <h2 className="kpi-value">{totalSpotsAvailable}</h2>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="dashboard-details-grid">
        {/* Status Section */}
        <div className="dashboard-section-card">
          <h2>Status das Atividades</h2>
          <div className="status-stats-list">
            <div className="status-stat-item">
              <div className="status-stat-label-group">
                <span className="status-indicator-dot open" />
                <span className="status-stat-label">Abertas</span>
              </div>
              <div className="status-stat-details">
                <span className="status-stat-number">{openActivities}</span>
                <span className="status-stat-percentage">({getPercentage(openActivities)}%)</span>
              </div>
            </div>

            <div className="status-stat-item">
              <div className="status-stat-label-group">
                <span className="status-indicator-dot full" />
                <span className="status-stat-label">Lotadas</span>
              </div>
              <div className="status-stat-details">
                <span className="status-stat-number">{fullActivities}</span>
                <span className="status-stat-percentage">({getPercentage(fullActivities)}%)</span>
              </div>
            </div>

            <div className="status-stat-item">
              <div className="status-stat-label-group">
                <span className="status-indicator-dot closed" />
                <span className="status-stat-label">Encerradas</span>
              </div>
              <div className="status-stat-details">
                <span className="status-stat-number">{closedActivities}</span>
                <span className="status-stat-percentage">({getPercentage(closedActivities)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="dashboard-section-card">
          <h2>Atividades por Categoria</h2>
          <div className="category-stats-list">
            {categoriesList.map((category) => {
              const count = categoryCounts[category]
              const percent = getPercentage(count)
              return (
                <div key={category} className="category-stat-item">
                  <div className="category-stat-header">
                    <span className="category-stat-name">{categoryLabels[category]}</span>
                    <span className="category-stat-count">
                      <strong>{count}</strong> {count === 1 ? 'atividade' : 'atividades'}
                    </span>
                  </div>
                  <div className="category-stat-bar-container">
                    <div
                      className="category-stat-bar-fill"
                      style={{ width: `${percent}%` }}
                      role="progressbar"
                      aria-valuenow={count}
                      aria-valuemin={0}
                      aria-valuemax={totalActivities}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

