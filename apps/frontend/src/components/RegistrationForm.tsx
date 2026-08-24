import { useState, type FormEvent } from 'react'
import axios from 'axios'
import { useCancelRegistration, useCreateRegistration } from '../hooks/useActivities'
import type { ApiError } from '../types/activity'
import { addMyRegistration, getMyRegistrationIds, removeMyRegistration } from '../utils/myRegistrations'

interface RegistrationFormProps {
  activityId: number
  disabled?: boolean
}

export function RegistrationForm({ activityId, disabled = false }: RegistrationFormProps) {
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const registration = useCreateRegistration(activityId)
  const cancelRegistration = useCancelRegistration(activityId)
  const myRegistrationId = getMyRegistrationIds(activityId)[0]

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    registration.mutate(
      { studentName, studentEmail },
      {
        onSuccess: (data) => {
          addMyRegistration(activityId, data.id)
          setStudentName('')
          setStudentEmail('')
        },
      },
    )
  }

  function handleCancel() {
    if (myRegistrationId === undefined) return
    cancelRegistration.mutate(myRegistrationId, {
      onSuccess: () => removeMyRegistration(activityId, myRegistrationId),
    })
  }

  const apiError = axios.isAxiosError<ApiError>(registration.error)
    ? registration.error.response?.data.message
    : undefined

  return (
    <section className="registration-panel" aria-labelledby="registration-title">
      <div>
        <p className="eyebrow">Participe</p>
        <h2 id="registration-title">Inscreva-se nesta atividade</h2>
      </div>
            {myRegistrationId !== undefined ? (
        <p className="notice success already-registered">
          <span>Você já está inscrito nesta atividade.</span>
          <button
            className="primary-button"
            type="button"
            onClick={handleCancel}
            disabled={cancelRegistration.isPending}
          >
            {cancelRegistration.isPending ? 'Cancelando...' : 'Cancelar inscrição'}
          </button>
        </p>
      ) : disabled ? (
        <p className="notice warning">As inscrições para esta atividade não estão disponíveis.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              name="studentName"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              minLength={3}
              required
              placeholder="Seu nome completo"
            />
          </label>
          <label>
            E-mail
            <input
              name="studentEmail"
              value={studentEmail}
              onChange={(event) => setStudentEmail(event.target.value)}
              type="email"
              required
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              title="Informe um e-mail válido, com domínio e extensão (ex: voce@email.com)"
              placeholder="voce@email.com"
            />
          </label>
          <button className="primary-button" type="submit" disabled={registration.isPending}>
            {registration.isPending ? 'Enviando...' : 'Confirmar inscrição'}
          </button>
        </form>
      )}
      {registration.isError && (
        <p className="notice error" role="alert">{apiError ?? 'Não foi possível realizar a inscrição.'}</p>
      )}
      {cancelRegistration.isError && (
        <p className="notice error" role="alert">Não foi possível cancelar a inscrição.</p>
      )}
    </section>
  )
}