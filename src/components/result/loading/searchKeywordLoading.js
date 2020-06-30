import React from 'react'

const SearchKeywordLoading = React.memo(({ isLoading }) => (
  <div className="loading-container">
    <div className={isLoading ? 'loading-bar' : ''} />
  </div>
))

export default SearchKeywordLoading
