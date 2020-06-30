import React from 'react'
import useDoubleClick from 'hooks/common/useDoubleClick'
import { showConnectToYoutube } from 'utils/base'
import { normalizeSearchResultText } from 'utils/result'

const ResultRow = React.memo(({ song, searchArtist }) => {
  const titleRef = useDoubleClick(() => {
    const { title, artist } = song
    showConnectToYoutube(title, `${title}+${artist.replace(/[/+]/ig, '+')}`)
  })
  const artistRef = useDoubleClick(() => searchArtist(song.artist))

  const { title, artist, position } = normalizeSearchResultText(song)
  return (
    <div className="row">
      <div className="row__title" ref={titleRef}>{title}</div>
      <div className="row__artist" ref={artistRef}>{artist}</div>
      <div className="row__position">{position}</div>
    </div>
  )
})

export default ResultRow
