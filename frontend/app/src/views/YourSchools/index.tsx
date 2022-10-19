//Utils
import _ from "lodash"
//Components
import { MDBAlert } from "mdbreact"
import * as React from "react"
//Hooks
import { useEffect,useState } from "react"
import { Trans,useTranslation  } from "react-i18next"
import { useDispatch,useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { ReactComponent as Pencil } from "../../assets/edit.svg"
import ProfileListItem from "../../components/ProfileListItem"
import history from "../../history"
import useLoader from "../../hooks/useLoader"
//Actions
import * as actions from "../../store/actions"
//Types
import {
  CompletionStatus,
  CompletionStep,
  Filters,
  ReduxState,
  UniversityProfile,
} from "../../store/types"
import { FilterType } from "../Search/Filters/filterTypes"
import StudentsFilters from "../Search/Filters/StudentsFilters"
//Styles
import Styles from "./index.module.scss"

const YourSchools: React.FC = () => {
  const isTokenLoaded = useSelector<ReduxState, boolean>(
    (state) => state.auth.isTokenLoaded,
  )
  const dreamUniversities = useSelector<ReduxState, UniversityProfile[] | null>(
    (state) => state.follow.dreamUniversities,
  )
  const followedUniversities = useSelector<
    ReduxState,
    UniversityProfile[] | null
  >((state) => state.follow.followedUniversities)
  const recommendedUniversities = useSelector<
    ReduxState,
    UniversityProfile[] | null
  >((state) => state.follow.recommendedUniversities)
  const isProfileLoaded = useSelector<ReduxState, boolean>(
    (state) => state.profile.isProfileLoaded,
  )
  const isSurveyCompleted = useSelector<ReduxState, boolean>(
    (state) =>
      state.profile.profile?.completion[
        CompletionStep.CollegePreferenceSurvey
      ] === CompletionStatus.Completed,
  )
  const { searchParams } = useSelector((state: ReduxState) => state.shared)
  const dispatch = useDispatch()

  const [filters, setFilters] = useState<Filters.University>({
    name: ``,
    matchLevel: [],
    location: [],
    sortBy: `score`,
    locale: [],
    region: [],
    schoolSize: [],
    admissionGender: null,
    schoolType: [],
    degree: [],
    athleticDivision: [],
  })
  // const [isFollowUniversityModalVisible, setFollowUniversityModalVisible] = useState(false);
  // const [followUniversity, setFollowUniversity] = useState<UniversityProfile | null>(null);

  const { onLoadComplete } = useLoader()

  useEffect(() => {
    if (!isTokenLoaded || followedUniversities) {
      return
    }

    dispatch(actions.getYourSchools())
  }, [isTokenLoaded, dreamUniversities, followedUniversities])

  useEffect(() => {
    if (!isTokenLoaded && followedUniversities) {
      return
    }

    dispatch(actions.getYourSchools())
  }, [isTokenLoaded, history.location.pathname])

  useEffect(() => {
    if (!isTokenLoaded || recommendedUniversities) {
      return
    }

    dispatch(actions.getRecommendedUniversities())
  }, [isTokenLoaded, recommendedUniversities])

  useEffect(() => {
    if (searchParams) {
      return
    }

    dispatch(actions.getUniversitySearchParams())
  }, [searchParams])

  useEffect(() => {
    if (
      !isProfileLoaded ||
      (isSurveyCompleted &&
        (!dreamUniversities ||
          !followedUniversities ||
          !recommendedUniversities))
    ) {
      return
    }

    onLoadComplete()
  }, [dreamUniversities, followedUniversities, recommendedUniversities])

  const { t } = useTranslation()

  return (
    <>
      <div className={Styles.container}>
        {!isSurveyCompleted && (
          <MDBAlert className={`d-flex`} color={`warning`}>
            <div className={`position-relative mr-3`} style={{ top: -2 }}>
              <Pencil />
            </div>

            <div className={`flex-grow-1 d-flex align-items-center`}>
              <p className={`mb-0`}>
                <Trans
                  i18nKey={`common:pleaseCompleteCollegeInterestsSurvey`}
                  components={[<Link to={`/surveys`} />]}
                />
              </p>
            </div>
          </MDBAlert>
        )}

        <section>
          <h1>{t(`yourSchools.dreamSchools`)}</h1>

          <div>
            {dreamUniversities?.map((university) => (
              <ProfileListItem
                key={`dreamUniversity-${university.id}`}
                university={university}
                type={`dream`}
              />
            ))}

            {!dreamUniversities &&
              _.times(3, (i) => (
                <ProfileListItem
                  key={`dreamUniversityPlaceholder-${i}`}
                  loading
                />
              ))}
          </div>

          {dreamUniversities && (
            <p className={`text-4`}>
              {t(`yourSchools.dreamSchoolsAdded`, {
                count: dreamUniversities.length,
                max: 5,
              })}
            </p>
          )}
        </section>

        <section>
          <h1>{t(`yourSchools.followedSchools`)}</h1>

          <StudentsFilters
            filters={filters}
            onChange={(filters) => {
              setFilters(filters)
              dispatch(actions.getYourSchools(filters))
            }}
            type={FilterType.FOLLOWED}
          />

          <div>
            {followedUniversities?.map((university) => (
              <ProfileListItem
                key={`followedUniversity-${university.id}`}
                university={university}
                type={`followed`}
              />
            ))}

            {!followedUniversities &&
              _.times(5, (i) => (
                <ProfileListItem
                  key={`followedUniversityPlaceholder-${i}`}
                  loading
                />
              ))}
          </div>
        </section>

        {/* {isSurveyCompleted && (
                    <section>
                        <h1>{t('yourSchools.recommendedSchools')}</h1>

                        <div className={Styles.recommendedSchools}>
                            {recommendedUniversities?.slice(0, 2).map(university => (
                                <RecommendedUniversity
                                    key={`recommendedUniversity-${university.id}`}
                                    className={Styles.recommendedSchool}
                                    university={university}
                                    onClick={() => {
                                        setFollowUniversity(university);
                                        setFollowUniversityModalVisible(true);
                                    }}
                                />
                            ))}

                            {!recommendedUniversities && _.times(2, i => (
                                <RecommendedUniversity
                                    key={`recommendedUniversityPlaceholder-${i}`}
                                    className={Styles.recommendedSchool}
                                    loading
                                />
                            ))}
                        </div>
                    </section>
                )} */}
      </div>

      {/* {followUniversity && (
                <FollowConfirmationModal
                    university={followUniversity}
                    visible={isFollowUniversityModalVisible}
                    onClose={() => setFollowUniversityModalVisible(false)}
                />
            )} */}
    </>
  )
}

export default YourSchools
