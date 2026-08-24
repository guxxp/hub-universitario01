const STORAGE_KEY = 'hub:myRegistrations'

type MyRegistrationsMap = Record<number, number[]>

function readStorage(): MyRegistrationsMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as MyRegistrationsMap) : {}
  } catch {
    return {}
  }
}

function writeStorage(data: MyRegistrationsMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getMyRegistrationIds(activityId: number): number[] {
  return readStorage()[activityId] ?? []
}

export function addMyRegistration(activityId: number, registrationId: number) {
  const data = readStorage()
  const current = data[activityId] ?? []
  data[activityId] = current.includes(registrationId) ? current : [...current, registrationId]
  writeStorage(data)
}

export function removeMyRegistration(activityId: number, registrationId: number) {
  const data = readStorage()
  data[activityId] = (data[activityId] ?? []).filter((id) => id !== registrationId)
  writeStorage(data)
}