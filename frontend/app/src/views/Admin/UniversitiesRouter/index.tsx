import * as React from "react"
//Components
import { Route,Switch } from "react-router"

//Routes
import AdminRoute from "../../../routes/AdminRoute"
//Views
import Universities from "./Universities"
import UniversityView from "./University"

const UniversitiesRouter: React.VFC = () => (
  <Switch>
    <Route
      path={`/admin/universities`}
      render={() => (
        <AdminRoute background>
          <Universities />
        </AdminRoute>
      )}
      exact
    />

    <Route
      path={`/admin/university/:id`}
      render={() => (
        <AdminRoute narrow>
          <UniversityView />
        </AdminRoute>
      )}
    />
  </Switch>
)

export default UniversitiesRouter
