import React, { useCallback } from 'react'
import { useSearchPageContext } from 'context/searchPage'
import ResultRow from './resultRow'
import useSmoothLoading from 'hooks/common/useSmoothLoading'
import FetchMoreLoading from './loading/fetchMoreLoading'
import SearchKeywordLoading from './loading/searchKeywordLoading'
import useScrollBottom from 'hooks/common/useScrollBottom'

const Result = () => {
  const {
    context,
    searchKeywordLoading,
    fetchMoreLoading,
    sendFetchMore,
    sendChangeInput
  } = useSearchPageContext()

  const searchArtist = useCallback(
    (artist) => { sendChangeInput(artist, true) },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  useScrollBottom(() => {
    const { pagination: { currentPage, totalPages } } = context
    if (currentPage < totalPages) {
      sendFetchMore(currentPage + 1)
    }
  })

  const { showLoading: showSearchKeywordLoading } = useSmoothLoading(searchKeywordLoading)

  return (
    <div>
      <SearchKeywordLoading isLoading={showSearchKeywordLoading} />
      {context.result.map(song => (
        <ResultRow
          key={`${song.title}${song.volume}${song.page}`}
          song={song}
          searchArtist={searchArtist}
        />
      ))}
      <FetchMoreLoading isLoading={fetchMoreLoading} />
    </div>
  )
}

export default Result
