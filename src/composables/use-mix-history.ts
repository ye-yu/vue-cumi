import { tagString, useLocalStorage } from "./use-local-storage";

export type Mixes = Record<string, number>
export interface MixHistory {
  name: string,
  mixes: Record<string, number>
}

export function useMixHistory() {
  const localStorage = useLocalStorage()
  return {
    get todaysKey() {
      const date = new Date()
      const key = [
        'mix-history',
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
      ].join(':')
      return tagString<MixHistory>(key)
    },
    get yesterdaysKey() {
      const date = new Date()
      const key = [
        'mix-history',
        date.getDate() - 1,
        date.getMonth(),
        date.getFullYear(),
      ].join(':')
      return tagString<MixHistory>(key)
    },
    saveTodaysMix(mixes: Mixes, name: string) {
      localStorage.set(this.todaysKey, {
        name: name,
        mixes,
      })
    },
    get todaysMix() {
      return localStorage.get(this.todaysKey)
    },
    get yesterdaysMix() {
      return localStorage.get(this.yesterdaysKey)
    },
  }
}
