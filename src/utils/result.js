export const normalizeSearchResultText = data => {
  /*
   * If no artist data                       => Replace artist text with "-"
   * If there are multi artists in one field => Replace "/" and "+" with "line break"
   *                                           (based on "white-space: pre-wrap;") 
   */
  const artistText = (data.artist === '' || data.artist === 'XXX')
    ? '-'
    : data.artist.replace(/[/+]/ig, '\n')
  const positionText = data.volume === ''
    ? Number(data.page)
    : `${Number(data.volume)}/${Number(data.page)}`

  return {
    artist: artistText,
    position: positionText,
    title: data.title
  }
}