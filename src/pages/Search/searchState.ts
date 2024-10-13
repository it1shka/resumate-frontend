import { create } from 'zustand'

export type SearchState = {
  search: string
  template?: string
  setSearch: (newSearch: string) => void
  setTemplate: (newTemplate?: string) => void
}

const useSearchState = create<SearchState>(set => ({
  search: '',
  template: undefined,
  setSearch: newSearch => {
    set(prev => ({
      ...prev,
      search: newSearch,
    }))
  },
  setTemplate: newTemplate => {
    set(prev => ({
      ...prev,
      template: newTemplate,
    }))
  },
}))

export default useSearchState
