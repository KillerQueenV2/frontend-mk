import React, { useState, Dispatch, SetStateAction } from 'react'

export type searchContextType = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export const SearchContext = React.createContext<searchContextType>({
  search: '',
  setSearch: text => console.warn('no Product text')
})

export const SearchProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={{search, setSearch}}>
      {children}
    </SearchContext.Provider>
  )
}