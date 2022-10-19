//Utils
import classNames from "classnames"
//Components
import { MDBCard, MDBCol, MDBContainer, MDBDataTableV5,MDBRow } from "mdbreact"
import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { Link } from "react-router-dom"

import TextField from "../../../../components/TextField/TextField"
import useLoader from "../../../../hooks/useLoader"
//Actions
import * as actions from "../../../../store/actions"
//Types
import { ReduxState, UniversitiesAdminData } from "../../../../store/types"
//Styles
import Styles from "./index.module.scss"

interface Sort {
  field: "name" | "claimed" | "email" | "contacted"
  order: "asc" | "desc"
}

const Universities: React.VFC = () => {
  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => !!state.auth.tokenType && !!state.auth.accessToken,
  )
  const universities = useSelector<ReduxState, UniversitiesAdminData | null>(
    (state) => state.admin.universities,
  )
  const dispatch = useDispatch()

  const [sort, setSort] = useState<Sort>({
    field: `name`,
    order: `asc`,
  })
  const [query, setQuery] = useState(``)

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (universities) {
      onLoadComplete()
      return
    }

    dispatch(actions.getUniversitiesAdminData())
  }, [isTokenLoaded, universities])

  const { t } = useTranslation()

  const handleSort = ({
    column: field,
    direction: order,
  }: {
    column: Sort["field"]
    direction: Sort["order"]
  }) =>
    setSort({
      field: field ?? sort.field,
      order:
        sort.field === field ? (sort.order === `desc` ? `asc` : `desc`) : order,
    })

  return (
    <MDBContainer fluid>
      <h1 className={`ml-5`}>{t(`universities.universitiesAndColleges`)}</h1>

      <MDBRow className={`mt-5`} around>
        <MDBCol xs={`4`} sm={`3`} md={`2`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {universities?.stats.universitiesQty.toLocaleString(`en-US`)}
            </h2>
            <h3 className={`mb-0`}>{t(`universities.universities`)}</h3>
          </MDBCard>
        </MDBCol>

        <MDBCol xs={`4`} sm={`3`} md={`2`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {universities?.stats.claimed.toLocaleString(`en-US`)}
            </h2>
            <h3 className={`mb-0`}>{t(`universities.claimed`)}</h3>
          </MDBCard>
        </MDBCol>

        <MDBCol xs={`4`} sm={`3`} md={`2`}>
          <MDBCard className={`align-items-center py-4`}>
            <h2 className={`font-family-normal mb-2`}>
              {universities?.stats.contacted.toLocaleString(`en-US`)}
            </h2>
            <h3 className={`mb-0`}>{t(`universities.contacted`)}</h3>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBCard className={`d-flex flex-column mt-5`}>
        <TextField
          className={classNames(Styles.searchInput, `align-self-end m-0`)}
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
          placeholder={t(`common:searchForSchools`)}
        />

        <MDBDataTableV5
          className={Styles.table}
          data={{
            columns: [
              { label: t(`universities.universityName`), field: `name` },
              { label: t(`universities.isClaimed`), field: `claimed` },
              { label: t(`universities.contactEmail`), field: `email` },
              { label: t(`common:isContacted`), field: `contacted` },
            ].map((column) => {
              if (column.field === sort.field) {
                return {
                  ...column,
                  sort: sort.order,
                }
              }

              return {
                ...column,
                sort: null,
              }
            }) as any,
            rows:
              universities?.universities
                .map((university) => ({
                  id: university.id,
                  name: university.name,
                  claimed: university.stats?.claimed
                    ? t(`common:yes`)
                    : t(`universities.unclaimed`),
                  email:
                    university?.email ?? university.administrator?.email ?? `-`,
                  contacted: university.stats?.contacted
                    ? t(`common:yes`)
                    : t(`common:no`),
                }))
                .filter(
                  (university) =>
                    !query.length ||
                    university.name
                      .toLowerCase()
                      .includes(query.toLowerCase()) ||
                    university.email
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                )
                .sort(
                  (a, b) =>
                    (a[sort.field] > b[sort.field] ? 1 : -1) *
                    (sort.order === `asc` ? 1 : -1),
                )
                .map((university) => ({
                  ...university,
                  name: (
                    <Link
                      className={Styles.link}
                      to={`/admin/university/${university.id}`}
                    >
                      {university.name}
                    </Link>
                  ),
                })) ?? [],
          }}
          onSort={
            handleSort as ({
              column,
              direction,
            }: {
              column: string
              direction: string
            }) => void
          }
          displayEntries={false}
          searching={false}
          bordered
          small
          noBottomColumns
          disableRetreatAfterSorting={true}
        />
      </MDBCard>
    </MDBContainer>
  )
}

export default Universities
