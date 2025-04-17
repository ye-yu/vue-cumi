export type TaggedString<Data> = string & { _type: Data }

export function tagString<Data>(s: string) {
  return s as TaggedString<Data>
}

export function useLocalStorage() {
  function get<T>(key: string, transformer: { new(data: never | null): T }): T
  function get<Data>(key: TaggedString<Data>): Data | null
  function get<T>(key: string, transformer?: { new(data: never | null): T }): T | null {
    const value = localStorage.getItem(key)
    try {
      const parsed = value ? JSON.parse(value) : null
      return transformer ? new transformer(parsed as never) : parsed;
    } catch (error) {
      console.error("useLocalStorage error", error)
      return transformer ? new transformer(null) : null;
    }
  }

  function set<T>(key: string, value: T) {
    const stringified = JSON.stringify(value)
    localStorage.setItem(key, stringified)
  }

  function del(key: string) {
    localStorage.removeItem(key);
  }
  return {
    get,
    set,
    del,
  }
}
