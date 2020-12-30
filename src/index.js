import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Dreamcatcher } from "./components/Dreamcatcher"
import './index.css'

ReactDOM.render(    
    <React.StrictMode>
        <Router>
            <Dreamcatcher />
        </Router>
    </React.StrictMode>,
document.getElementById('root')
)
