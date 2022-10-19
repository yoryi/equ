//Utils
import classNames from "classnames";
import _ from "lodash";
import { MDBPopover, MDBPopoverBody } from "mdbreact";
import React from "react";
//Hooks
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
//Components
import { Link, Route } from "react-router-dom";

import AppLogo from "../assets/app-logo.svg";
import CloseIcon from "../assets/close-icon.svg";
//Images
import { ReactComponent as Close } from "../assets/close-icon.svg";
import MobileAppLogo from "../assets/mobile-app-logo.svg";
import SearchIcon from "../assets/search-icon.svg";
import Footer from "../components/Footer/Footer";
import TextField from "../components/TextField/TextField";
import history from "../history";
import useWindowDimensions from "../hooks/UseWindowDimensions";
import { actions } from "../store";
//Types
import {
  NotificationType,
  Profile,
  ReduxState,
  Role,
  SignUpStep,
} from "../store/types";
import { StudentMenu } from "../views/Menu/StudentMenu";
import { StudentMenuMobile } from "../views/Menu/StudentMenuMobile";
import { UniversityMenu } from "../views/Menu/UniversityMenu";
import { UniversityMenuMobile } from "../views/Menu/UniversityMenuMobile";
//Styles
import Styles from "./ProtectedRoute.module.scss";

interface BaseRouteProps {
  path: string | string[];
  component?: any;
  exact?: boolean;
  render?: any;
}

const surveysRegex = /^\/surveys\/survey\/.*$/;

const ProtectedRoute: React.FC<BaseRouteProps> = ({
  component: Component,
  ...props
}) => {
  const { t } = useTranslation();
  const { windowWidth } = useWindowDimensions();
  const dispatch = useDispatch();

  const surveyTitle = useSelector<ReduxState, string | null>(
    (state) => state.surveys.survey?.title ?? null
  );
  const areUnreadNotificationsPresent = useSelector<ReduxState, boolean>(
    (state) =>
      !!state.notifications.notifications?.filter(
        (notification) =>
          !notification.readAt &&
          (notification.actionType !== NotificationType.UnfollowRequest ||
            state.auth.user?.role !== Role.Student)
      ).length ||
      (state.auth.user?.role === Role.Student &&
        !!state.profile.unacceptedReferences?.length)
  );
  const { user } = useSelector((state: any) => state.auth);
  const {
    autocompleteResults,
    loadingAutocompleteResults,
    autocompleteSearchText,
  } = useSelector((state: ReduxState) => state.searchAndFilters);
  const profile = useSelector<ReduxState, Profile | null>(
    (state) => state.profile.profile
  );

  const [isSearchSuggestionBoxVisible, setSearchSuggestionBoxVisible] =
    useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (searchBoxRef.current?.contains(e.target as Node)) {
        return;
      }

      if (windowWidth > 1023) {
        setSearchSuggestionBoxVisible(false);
      }
    },
    [searchBoxRef, setSearchSuggestionBoxVisible, windowWidth]
  );

  useEffect(() => {
    document.addEventListener(`click`, handleDocumentClick);

    return () => document.removeEventListener(`click`, handleDocumentClick);
  }, [handleDocumentClick]);

  useEffect(() => {
    document.body.style.overflow =
      isSearchSuggestionBoxVisible && windowWidth < 1023 ? `hidden` : `auto`;

    return () => {
      document.body.style.overflow = `auto`;
    };
  }, [isSearchSuggestionBoxVisible, windowWidth]);

  useEffect(() => {
    if (history.location.pathname !== `/search`) {
      if (autocompleteSearchText) {
        dispatch(actions.setAutocompleteSearchText(``));
      }
    }
  }, [history.location.pathname]);

  const path = history.location.pathname;

  const debouncedSearch = useCallback(
    _.debounce((nextValue: string) => {
      user?.role === Role.University
        ? dispatch(actions.searchStudentsByName({ name: nextValue }))
        : dispatch(actions.searchUniversitiesByName({ name: nextValue }));
    }, 1000),
    []
  );

  const handleSearchSubmit = (text: string) => {
    dispatch(actions.setAutocompleteSearchText(text));

    if (text.length < 2) {
      return;
    }
    debouncedSearch(text);
  };

  const handleSearchEnterSubmit = (e: any) => {
    if (history.location.pathname !== `/search`) {
      history.push(`/search`);
      dispatch(actions.setSearchText(autocompleteSearchText));
      setSearchSuggestionBoxVisible(false);
      e.preventDefault();
    } else {
      dispatch(actions.setSearchText(autocompleteSearchText));
      setSearchSuggestionBoxVisible(false);
      return e.preventDefault();
    }
  };

  const getNavContent = () => {
    if (surveysRegex.exec(path)) {
      return (
        <div className={Styles.closeButtonContainer}>
          <Link to={`/surveys`} className={Styles.closeButton}>
            <Close />
          </Link>
        </div>
      );
    } else {
      return (
        <>
          {user?.role === Role.Student && (
            <div style={{ display: `flex`, alignItems: `center` }}>
              <div
                className="fixed-header-nav-item"
                onClick={() => history.push(`/your-schools`)}
              >
                {t(`menuScreen.yourSchools`)}
              </div>

              <div
                className={classNames(
                  {
                    [Styles.unreadNotifications]: areUnreadNotificationsPresent,
                  },
                  `fixed-header-nav-item`
                )}
                onClick={() => history.push(`/notifications`)}
              >
                {t(`menuScreen.notifications`)}
              </div>

              <div className="fixed-header-nav-item">
                <StudentMenu />
              </div>
            </div>
          )}

          {user?.role === Role.University && (
            <div style={{ display: `flex`, alignItems: `center` }}>
              <div
                className="fixed-header-nav-item"
                onClick={() => history.push(`/lists`)}
              >
                {t(`menuScreen.lists`)}
              </div>
              <div
                className="fixed-header-nav-item"
                onClick={() => history.push(`/followed-students`)}
              >
                {t(`menuScreen.followedStudents`)}
              </div>
              <div
                className={classNames(
                  {
                    [Styles.unreadNotifications]: areUnreadNotificationsPresent,
                  },
                  `fixed-header-nav-item`
                )}
                onClick={() => history.push(`/notifications`)}
              >
                {t(`menuScreen.notifications`)}
              </div>
              <div className="fixed-header-nav-item">
                <UniversityMenu />
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <Route
      {...props}
      render={(renderProps) => (
        <>
          <div className="wrapper-protected-route">
            {windowWidth > 1023 ? (
              <div className="fixed-header" id="fixed-header">
                <div
                  className="fixed-header-left"
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                  }}
                >
                  {(user?.role === Role.Student ||
                    user?.role === Role.University ||
                    user?.role === Role.Admin ||
                    user?.role === Role.Program) && (
                    <Link to={`/`}>
                      <img
                        src={AppLogo}
                        alt="Logo"
                        className="fixed-header-left-logo"
                      />
                    </Link>
                  )}

                  {!surveysRegex.exec(path) &&
                    ((profile?.signUpStep === SignUpStep.Finish &&
                      user?.role === Role.Student) ||
                      user?.role === Role.University) && (
                      <div ref={searchBoxRef} className={`position-relative`}>
                        <MDBPopover
                          className={Styles.popover}
                          placement={`bottom`}
                          isVisible={isSearchSuggestionBoxVisible}
                          onChange={
                            ((isVisible: boolean) =>
                              setSearchSuggestionBoxVisible(isVisible)) as any
                          }
                          popover
                          clickable
                        >
                          <form
                            autoComplete="on"
                            onSubmit={handleSearchEnterSubmit}
                          >
                            <div>
                              <TextField
                                className={Styles.searchInput}
                                onChange={(e: any) => {
                                  handleSearchSubmit(e.target.value);
                                }}
                                value={autocompleteSearchText}
                                placeholder={t(
                                  `common:${
                                    user?.role === Role.University
                                      ? `searchForStudents`
                                      : `searchForSchools`
                                  }`
                                )}
                                title=""
                                icon={SearchIcon}
                              />
                            </div>
                          </form>
                          <MDBPopoverBody className={Styles.body}>
                            <span className={`text-3 mb-2`}>
                              {autocompleteSearchText &&
                              autocompleteSearchText.length > 1
                                ? t(`common:autocompleteSearches`)
                                : t(`common:recommendedAutoSearches`)}
                            </span>
                            <>
                              {loadingAutocompleteResults &&
                              autocompleteSearchText &&
                              autocompleteSearchText.length > 1 ? (
                                t(`common:loading`)
                              ) : autocompleteSearchText &&
                                autocompleteSearchText.length > 1 &&
                                autocompleteResults &&
                                autocompleteResults.length > 0 ? (
                                autocompleteResults.map((result: any) => (
                                  <Link
                                    to={
                                      user?.role === Role.University
                                        ? `/student/${result.id}`
                                        : `/university/${result.id}`
                                    }
                                    className={classNames(Styles.link, `my-2`)}
                                    onClick={() =>
                                      setSearchSuggestionBoxVisible(false)
                                    }
                                  >
                                    {user?.role === Role.University
                                      ? result.fullName
                                      : result.name}
                                  </Link>
                                ))
                              ) : !loadingAutocompleteResults &&
                                autocompleteSearchText &&
                                autocompleteSearchText.length > 1 ? (
                                t(`common:noResults`)
                              ) : (
                                <>
                                  {` `}
                                  {user?.role === Role.Student &&
                                    (!autocompleteSearchText ||
                                      (autocompleteSearchText &&
                                        autocompleteSearchText.length <=
                                          1)) && (
                                      <>
                                        <Link
                                          to={`/search`}
                                          className={classNames(
                                            Styles.link,
                                            `my-2`
                                          )}
                                          onClick={() =>
                                            dispatch(
                                              actions.setRecommendedSearch(
                                                `excellentMatches`
                                              )
                                            )
                                          }
                                        >
                                          {t(`common:excellentMatches`)}
                                        </Link>

                                        <Link
                                          to={`/search`}
                                          className={classNames(
                                            Styles.link,
                                            `my-2`
                                          )}
                                          onClick={() =>
                                            dispatch(
                                              actions.setRecommendedSearch(
                                                `localCollegesAndUniversities`
                                              )
                                            )
                                          }
                                        >
                                          {t(
                                            `common:localCollegesAndUniversities`
                                          )}
                                        </Link>
                                      </>
                                    )}
                                  {user?.role === Role.University &&
                                    (!autocompleteSearchText ||
                                      (autocompleteSearchText &&
                                        autocompleteSearchText.length <=
                                          1)) && (
                                      <>
                                        <Link
                                          to={`/search`}
                                          className={classNames(
                                            Styles.link,
                                            `my-2`
                                          )}
                                          onClick={() =>
                                            dispatch(
                                              actions.setRecommendedSearch(
                                                `goodAndExcellentMatches`
                                              )
                                            )
                                          }
                                        >
                                          {t(`common:goodAndExcellentMatches`)}
                                        </Link>
                                        {/* POST PILOT
                                                                <Link
                                                                    to={'/search'}
                                                                    className={classNames(Styles.link, 'my-2')}
                                                                    onClick={() => dispatch(actions.setRecommendedSearch('hometownHeroes'))}
                                                                >
                                                                    {t('common:hometownHeroes')}
                                                                </Link> */}
                                        <Link
                                          to={`/search`}
                                          className={classNames(
                                            Styles.link,
                                            `my-2`
                                          )}
                                          onClick={() =>
                                            dispatch(
                                              actions.setRecommendedSearch(
                                                `addedToDreamSchoolList`
                                              )
                                            )
                                          }
                                        >
                                          {t(`common:addedToDreamSchoolList`)}
                                        </Link>

                                        <Link
                                          to={`/search`}
                                          className={classNames(
                                            Styles.link,
                                            `my-2`
                                          )}
                                          onClick={() =>
                                            dispatch(
                                              actions.setRecommendedSearch(
                                                `incomingCollegeFreshmen`
                                              )
                                            )
                                          }
                                        >
                                          {t(`common:incomingCollegeFreshmen`)}
                                        </Link>

                                        <Link
                                          to={`/search`}
                                          className={classNames(
                                            Styles.link,
                                            `my-2`
                                          )}
                                          onClick={() =>
                                            dispatch(
                                              actions.setRecommendedSearch(
                                                `addedToFollowedSchoolsList`
                                              )
                                            )
                                          }
                                        >
                                          {t(
                                            `common:addedToFollowedSchoolsList`
                                          )}
                                        </Link>
                                      </>
                                    )}
                                </>
                              )}
                            </>

                            <Link
                              to={`/search`}
                              className={classNames(
                                Styles.advancedSearch,
                                `w-100 d-flex justify-content-center mt-2`
                              )}
                              onClick={() => {
                                if (history.location.pathname !== `/search`) {
                                  dispatch(
                                    actions.setSearchText(
                                      autocompleteSearchText
                                    )
                                  );
                                }
                                dispatch(actions.toggleAllFiltersModal(true));
                                setSearchSuggestionBoxVisible(false);
                              }}
                            >
                              {t(`common:advancedSearch`)}
                            </Link>
                          </MDBPopoverBody>
                        </MDBPopover>
                      </div>
                    )}
                </div>

                {surveysRegex.exec(path) && (
                  <div className={`fixed-header-center`}>
                    <span className={Styles.surveyTitle}>{surveyTitle}</span>
                  </div>
                )}

                <div className="fixed-header-buttons">{getNavContent()}</div>
              </div>
            ) : (
              <>
                {user?.role === Role.Student && (
                  <div className="mobile-fixed-header">
                    {!isSearchSuggestionBoxVisible ? (
                      <>
                        <img
                          src={SearchIcon}
                          alt="Search"
                          className="fixed-header-left-logo"
                          onClick={() => setSearchSuggestionBoxVisible(true)}
                          style={{ width: 24, height: 24 }}
                        />
                        <img
                          src={MobileAppLogo}
                          alt="Logo"
                          className="fixed-header-left-logo"
                          onClick={() => history.push(`/`)}
                        />
                        <StudentMenuMobile />
                      </>
                    ) : (
                      <>
                        <img
                          src={SearchIcon}
                          alt="Search"
                          className="fixed-header-left-logo"
                          onClick={() => setSearchSuggestionBoxVisible(false)}
                        />
                        <form
                          autoComplete="on"
                          onSubmit={handleSearchEnterSubmit}
                        >
                          <input
                            type="text"
                            placeholder={t(`common:searchSchools`)}
                            className="mobile-search"
                            onChange={(e: any) => {
                              handleSearchSubmit(e.target.value);
                            }}
                            value={autocompleteSearchText}
                          />
                        </form>
                        <img
                          src={CloseIcon}
                          alt="Search"
                          className="fixed-header-left-logo"
                          onClick={() => setSearchSuggestionBoxVisible(false)}
                        />
                        <div className="fixed-mobile-search">
                          <div className="fixed-mobile-search-title">
                            {autocompleteSearchText &&
                            autocompleteSearchText.length > 1
                              ? t(`common:autocompleteSearches`)
                              : t(`common:trySearchFor`)}
                          </div>
                          <div className="fixed-mobile-search-results">
                            {loadingAutocompleteResults &&
                            autocompleteSearchText &&
                            autocompleteSearchText.length > 1 ? (
                              t(`common:loading`)
                            ) : autocompleteSearchText &&
                              autocompleteResults &&
                              autocompleteResults.length > 0 ? (
                              autocompleteResults.map((result: any) => (
                                <Link
                                  to={`/university/${result.id}`}
                                  className={classNames(
                                    Styles.link,
                                    `my-2`,
                                    `fixed-mobile-search-results-item`
                                  )}
                                  onClick={() =>
                                    setSearchSuggestionBoxVisible(false)
                                  }
                                >
                                  {result.name}
                                </Link>
                              ))
                            ) : !loadingAutocompleteResults &&
                              autocompleteSearchText &&
                              autocompleteSearchText.length > 1 ? (
                              t(`common:noResults`)
                            ) : (
                              <>
                                {` `}
                                {(!autocompleteSearchText ||
                                  (autocompleteSearchText &&
                                    autocompleteSearchText.length <= 1)) && (
                                  <>
                                    <Link
                                      to={`/search`}
                                      className={classNames(
                                        Styles.link,
                                        `my-2`,
                                        `fixed-mobile-search-results-item`
                                      )}
                                      onClick={() => {
                                        dispatch(
                                          actions.setRecommendedSearch(
                                            `excellentMatches`
                                          )
                                        );
                                        setSearchSuggestionBoxVisible(false);
                                      }}
                                    >
                                      {t(`common:excellentMatches`)}
                                    </Link>
                                    <Link
                                      to={`/search`}
                                      className={classNames(
                                        Styles.link,
                                        `my-2`,
                                        `fixed-mobile-search-results-item`
                                      )}
                                      onClick={() => {
                                        dispatch(
                                          actions.setRecommendedSearch(
                                            `localCollegesAndUniversities`
                                          )
                                        );
                                        setSearchSuggestionBoxVisible(false);
                                      }}
                                    >
                                      {t(`common:localCollegesAndUniversities`)}
                                    </Link>
                                  </>
                                )}
                              </>
                            )}
                            {` `}
                            <Link
                              to={`/search`}
                              className={classNames(
                                Styles.advancedSearch,
                                `w-100 d-flex justify-content-center mt-2`
                              )}
                              onClick={() => {
                                if (history.location.pathname !== `/search`) {
                                  dispatch(
                                    actions.setSearchText(
                                      autocompleteSearchText
                                    )
                                  );
                                }
                                dispatch(actions.toggleAllFiltersModal(true));
                                setSearchSuggestionBoxVisible(false);
                              }}
                            >
                              {t(`common:advancedSearch`)}
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {user?.role === Role.University && (
                  <div className="mobile-fixed-header">
                    {!isSearchSuggestionBoxVisible ? (
                      <>
                        <img
                          src={SearchIcon}
                          alt="Search"
                          className="fixed-header-left-logo"
                          onClick={() => setSearchSuggestionBoxVisible(true)}
                        />
                        <img
                          src={MobileAppLogo}
                          alt="Logo"
                          className="fixed-header-left-logo"
                          onClick={() => history.push(`/university`)}
                        />
                        <UniversityMenuMobile />
                      </>
                    ) : (
                      <>
                        <img
                          src={SearchIcon}
                          alt="Search"
                          className="fixed-header-left-logo"
                          onClick={() => setSearchSuggestionBoxVisible(false)}
                        />
                        <form
                          autoComplete="on"
                          onSubmit={handleSearchEnterSubmit}
                        >
                          <input
                            type="text"
                            placeholder={t(`common:searchStudents`)}
                            className="mobile-search"
                            onChange={(e: any) => {
                              handleSearchSubmit(e.target.value);
                            }}
                            value={autocompleteSearchText}
                          />
                        </form>
                        <img
                          src={CloseIcon}
                          alt="Search"
                          className="fixed-header-left-logo"
                          onClick={() => setSearchSuggestionBoxVisible(false)}
                        />
                        <div className="fixed-mobile-search">
                          <div className="fixed-mobile-search-title">
                            {autocompleteSearchText &&
                            autocompleteSearchText.length > 1
                              ? t(`common:autocompleteSearches`)
                              : t(`common:trySearchFor`)}
                          </div>
                          <div className="fixed-mobile-search-results">
                            {loadingAutocompleteResults &&
                            autocompleteSearchText &&
                            autocompleteSearchText.length > 1 ? (
                              t(`common:loading`)
                            ) : autocompleteSearchText &&
                              autocompleteSearchText.length > 1 &&
                              autocompleteResults &&
                              autocompleteResults.length > 0 ? (
                              autocompleteResults.map((result: any) => (
                                <Link
                                  to={`/student/${result.id}`}
                                  className={classNames(
                                    Styles.link,
                                    `my-2`,
                                    `fixed-mobile-search-results-item`
                                  )}
                                  onClick={() =>
                                    setSearchSuggestionBoxVisible(false)
                                  }
                                >
                                  {result.fullName}
                                </Link>
                              ))
                            ) : !loadingAutocompleteResults &&
                              autocompleteSearchText &&
                              autocompleteSearchText.length > 1 ? (
                              t(`common:noResults`)
                            ) : (
                              <>
                                {` `}
                                {(!autocompleteSearchText ||
                                  (autocompleteSearchText &&
                                    autocompleteSearchText.length <= 1)) && (
                                  <>
                                    <Link
                                      to={`/search`}
                                      className={classNames(
                                        Styles.link,
                                        `my-2`,
                                        `fixed-mobile-search-results-item`
                                      )}
                                      onClick={() => {
                                        dispatch(
                                          actions.setRecommendedSearch(
                                            `goodAndExcellentMatches`
                                          )
                                        );
                                        setSearchSuggestionBoxVisible(false);
                                      }}
                                    >
                                      {t(`common:goodAndExcellentMatches`)}
                                    </Link>
                                    <Link
                                      to={`/search`}
                                      className={classNames(
                                        Styles.link,
                                        `my-2`,
                                        `fixed-mobile-search-results-item`
                                      )}
                                      onClick={() => {
                                        dispatch(
                                          actions.setRecommendedSearch(
                                            `addedToDreamSchoolList`
                                          )
                                        );
                                        setSearchSuggestionBoxVisible(false);
                                      }}
                                    >
                                      {t(`common:addedToDreamSchoolList`)}
                                    </Link>
                                    <Link
                                      to={`/search`}
                                      className={classNames(
                                        Styles.link,
                                        `my-2`,
                                        `fixed-mobile-search-results-item`
                                      )}
                                      onClick={() => {
                                        dispatch(
                                          actions.setRecommendedSearch(
                                            `incomingCollegeFreshmen`
                                          )
                                        );
                                        setSearchSuggestionBoxVisible(false);
                                      }}
                                    >
                                      {t(`common:incomingCollegeFreshmen`)}
                                    </Link>
                                    <Link
                                      to={`/search`}
                                      className={classNames(
                                        Styles.link,
                                        `my-2`,
                                        `fixed-mobile-search-results-item`
                                      )}
                                      onClick={() => {
                                        dispatch(
                                          actions.setRecommendedSearch(
                                            `addedToFollowedSchoolsList`
                                          )
                                        );
                                        setSearchSuggestionBoxVisible(false);
                                      }}
                                    >
                                      {t(`common:addedToFollowedSchoolsList`)}
                                    </Link>
                                  </>
                                )}
                              </>
                            )}
                            <Link
                              to={`/search`}
                              className={classNames(
                                Styles.advancedSearch,
                                `w-100 d-flex justify-content-center mt-2`
                              )}
                              onClick={() => {
                                if (history.location.pathname !== `/search`) {
                                  dispatch(
                                    actions.setSearchText(
                                      autocompleteSearchText
                                    )
                                  );
                                }
                                dispatch(actions.toggleAllFiltersModal(true));
                                setSearchSuggestionBoxVisible(false);
                              }}
                            >
                              {t(`common:advancedSearch`)}
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}

            <Component {...renderProps} />
          </div>

          <Footer />
        </>
      )}
    />
  );
};

export default ProtectedRoute;
