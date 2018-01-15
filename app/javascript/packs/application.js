import React from 'react'
import ReactDOM from 'react-dom'
import NotesApp from 'components/NotesApp.jsx'
import FolderGrid from 'components/FolderGrid.jsx'
import WebpackerReact from 'webpacker-react'

WebpackerReact.setup({NotesApp})
WebpackerReact.setup({FolderGrid})