import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import SearchPage from './searchPage'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<SearchPage />, document.getElementById('root'))

serviceWorker.register()
