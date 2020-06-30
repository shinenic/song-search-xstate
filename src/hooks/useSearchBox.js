import { useRef } from 'react'
import {
  isEmptyArray,
  isEmptyString,
  scrollToTop
} from 'utils/base'
import { useSearchPageContext } from 'context/searchPage'
import useClickTouchOutside from 'hooks/common/useClickTouchOutside'

const useSearchBox = () => {
  const {
    context,
    sendChangeInput,
    sendToggleClean
  } = useSearchPageContext()

  const handleOnChange = e => {
    sendChangeInput(e.target.value)
    scrollToTop()
  }

  const inputRef = useRef(null)
  const searchBoxRef = useRef(null)

  const setInputFocus = () => { inputRef.current.focus() }
  const setInputBlur = () => { inputRef.current.blur() }

  const handleClearBtnClick = () => { sendToggleClean() }

  useClickTouchOutside(searchBoxRef, setInputBlur)

  return {
    inputText: context.input,
    inputRef,
    searchBoxRef,
    handleOnChange,
    handleClearBtnClick,
    showSearchIcon: isEmptyArray(context.result) && isEmptyString(context.input),
    handleSearchBtnClick: setInputFocus
  }
}

export default useSearchBox
