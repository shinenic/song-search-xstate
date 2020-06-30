import React from 'react'
import useSearchBox from 'hooks/useSearchBox'
import searchIcon from 'img/search.svg'
import crossIcon from 'img/cross.svg'

const SearchBox = () => {
  const {
    inputText,
    inputRef,
    searchBoxRef,
    handleOnChange,
    handleClearBtnClick,
    showSearchIcon,
    handleSearchBtnClick
  } = useSearchBox()

  return (
    <div className="search-box" ref={searchBoxRef}>
      <input
        className="search-box__input"
        type="text"
        placeholder="Title / Artist / Volume"
        value={inputText}
        ref={inputRef}
        onChange={handleOnChange}
      />
      {
        showSearchIcon
          ? <img
            src={searchIcon}
            alt="icon"
            className="search-box__icon search-box__icon--search"
            onClick={handleSearchBtnClick}
          />
          : <img
            src={crossIcon}
            alt="icon"
            className="search-box__icon search-box__icon--cross"
            onClick={handleClearBtnClick}
          />
      }
    </div>
  )
}

export default SearchBox
