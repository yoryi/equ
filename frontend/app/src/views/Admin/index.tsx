import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact"
import * as React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"

import Avatar from "../../assets/07.svg"
import { ReactComponent as AppLogo } from "../../assets/app-logo.svg"
import { ReactComponent as Close } from "../../assets/close-icon.svg"
import { ReactComponent as Menu } from "../../assets/more-options-icon.svg"
import Footer from "../../components/Footer/Footer"
import AdminRoute from "../../routes/AdminRoute"
import * as actions from "../../store/actions"
import { ReduxState, Role } from "../../store/types"
import Styles from "./index.module.scss"
import PostReview from "./PostReview"
import StudentList from "./Students"
import CompletionTracker from "./Students/CompletionTracker"
import StudentOverview from "./Students/StudentOverview"
import UniversitiesRouter from "./UniversitiesRouter"

const Admin: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: ReduxState) => state.auth)

  const [isNavbarOpened, setNavbarOpened] = useState(false)

  const { t } = useTranslation()

  return (
    <>
      <MDBNavbar expand={`md`} sticky={`top`} color={`white`}>
        <MDBNavbarBrand href={`/admin`}>
          <AppLogo />
        </MDBNavbarBrand>

        <MDBNavbarToggler onClick={() => setNavbarOpened(!isNavbarOpened)}>
          {isNavbarOpened ? (
            <Close style={{ padding: 3, margin: 2, width: 20, height: 20 }} />
          ) : (
            <Menu />
          )}
        </MDBNavbarToggler>

        <MDBCollapse
          isOpen={isNavbarOpened}
          delay={{ show: 0, hide: 0 }}
          navbar
        >
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to={`/admin`} exact>
                {t(`admin.studentUserList`)}
              </MDBNavLink>
            </MDBNavItem>

            {user?.role === Role.Admin && (
              <>
                <MDBNavItem>
                  <MDBNavLink to={`/admin/universities`} exact>
                    {t(`admin.universities`)}
                  </MDBNavLink>
                </MDBNavItem>

                <MDBNavItem>
                  <MDBNavLink to={`/admin/post-review`} exact>
                    {t(`admin.postReview`)}
                  </MDBNavLink>
                </MDBNavItem>
              </>
            )}

            <MDBNavItem className={`d-flex flex-column justify-content-center`}>
              <MDBDropdown className={`menu-dropdown ml-4`}>
                <MDBDropdownToggle className={`p-0`} nav>
                  <img className={Styles.avatar} src={Avatar} alt={``} />
                </MDBDropdownToggle>

                <MDBDropdownMenu className={`mt-4 dropdown-default`} right>
                  <MDBDropdownItem onClick={() => dispatch(actions.signOut())}>
                    {t(`menuScreen.signOut`)}
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>

      <Switch>
        <Route
          path={`/admin/`}
          render={() => (
            <AdminRoute background>
              <StudentList />
            </AdminRoute>
          )}
          exact
        />

        <Route
          path={[`/admin/universities`, `/admin/university/:id`]}
          component={UniversitiesRouter}
        />

        <Route
          path={`/admin/post-review`}
          render={() => (
            <AdminRoute background>
              <PostReview />
            </AdminRoute>
          )}
        />

        <Route
          path={`/admin/completion/:id`}
          render={() => (
            <AdminRoute>
              <CompletionTracker />
            </AdminRoute>
          )}
        />
        <Route
          path={`/admin/student/:id`}
          render={() => (
            <AdminRoute>
              <StudentOverview />
            </AdminRoute>
          )}
        />
      </Switch>

      <Footer className={Styles.footer} />
    </>
  )
}

export default Admin
