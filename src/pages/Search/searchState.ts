import { create } from 'zustand'

export type SearchState = {
  search: string
  setSearch: (newSearch: string) => void
}

const useSearchState = create<SearchState>(set => ({
  search: '',
  setSearch: newSearch => {
    set(prev => ({
      ...prev,
      search: newSearch,
    }))
  },
}))

export default useSearchState
