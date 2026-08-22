import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createRegistration,
  getActivities,
  getActivity,
  getRegistrations,
} from '../services/activityService'
import type { RegistrationInput } from '../types/activity'

export function useActivities(search: string) {
  return useQuery({
    queryKey: ['activities', { search }],
    queryFn: () => getActivities(search),
  })
}

export function useActivity(id: number) {
  return useQuery({
    queryKey: ['activities', id],
    queryFn: () => getActivity(id),
    enabled: Number.isFinite(id),
  })
}

export function useRegistrations(activityId: number) {
  return useQuery({
    queryKey: ['activities', activityId, 'registrations'],
    queryFn: () => getRegistrations(activityId),
    enabled: Number.isFinite(activityId),
  })
}

export function useCreateRegistration(activityId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: RegistrationInput) => createRegistration(activityId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.invalidateQueries({ queryKey: ['activities', activityId] })
      queryClient.invalidateQueries({ queryKey: ['activities', activityId, 'registrations'] })
    },
  })
}