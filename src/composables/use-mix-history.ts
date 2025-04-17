import { tagString, useLocalStorage } from "./use-local-storage";

export type Mixes = Record<string, number>
export interface MixHistory {
  name: string,
  mixes: Record<string, number>
}

function generateKeyFromDate(date: Date) {
  const key = [
    'mix-history',
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ].join(':')
  return tagString<MixHistory>(key)
}

const todaysKey = generateKeyFromDate(new Date)
const date = new Date
date.setDate(date.getDate() - 1)

const yesterdaysKey = generateKeyFromDate(date)

export function useMixHistory() {
  const localStorage = useLocalStorage()
  return {
    saveTodaysMix(mixes: Mixes, name: string) {
      localStorage.set(todaysKey, {
        name: name,
        mixes,
      })
    },
    get todaysMix() {
      return localStorage.get(todaysKey)
    },
    get yesterdaysMix() {
      return localStorage.get(yesterdaysKey)
    },
  }
}
