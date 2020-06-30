import { gql } from "apollo-boost";

export const SONGS_QUERY = gql`
  query Songs($keyword: String, $page: Int) {
    songs(keyword: $keyword, page: $page) {
      result {
        title
        artist
        volume
        page
      }
      pagination {
        totalCount
        pageSize
        totalPages
        currentPage
      }
    }
  }
`
