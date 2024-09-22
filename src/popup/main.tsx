import React from "react"
import {createRoot} from "react-dom/client"
import "./popup.css"
import App from "./App"

const root = createRoot(document.getElementById("app"))
root.render(<App />)
