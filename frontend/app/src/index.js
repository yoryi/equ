import "./index.css"

import { GlobalStyles } from "@equedi/brand-ui/src/theme"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import * as serviceWorker from "./serviceWorker"

if (process.env.REACT_APP_ENABLE_SENTRY === `1`) {
  Sentry.init({
    dsn:
      `https://ae629991eb99438085c27ac81915ee64@o513150.ingest.sentry.io/5614496`,
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0,
  })
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </React.StrictMode>,
  document.getElementById(`root`),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
