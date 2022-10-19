import classNames from "classnames"
import * as React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { ReactComponent as Close } from "../../assets/close-icon-white.svg"
import * as actions from "../../store/actions"
import { Search } from "../../store/types"
import RoundButton, { RoundButtonState } from "../RoundButton"

interface SavedSearchProps {
  className?: string
  search: Search.SavedSearch
  removable?: boolean
}

const SavedSearch: React.VFC<SavedSearchProps> = ({
  className,
  search,
  removable = false,
}) => {
  const dispatch = useDispatch()

  const [buttonState, setButtonState] = useState<RoundButtonState>(
    RoundButtonState.Default,
  )

  const handleDelete = async () => {
    try {
      setButtonState(RoundButtonState.Loading)
      await dispatch(actions.deleteSavedSearch(search))
    } catch (err) {
      if (err.message) {
        toast.error(err.message)
      }

      setButtonState(RoundButtonState.Error)
    }
  }

  const { t } = useTranslation()

  return (
    <div
      className={classNames(
        `d-flex justify-content-between align-items-center`,
        className,
      )}
    >
      <Link
        to={`/search`}
        className={`d-flex flex-column flex-sm-row align-items-sm-end font-weight-semi-bold`}
        onClick={() => dispatch(actions.setSavedSearch(search.query))}
        role={`search`}
      >
        {search.name}

        <span className={`text-3 ml-0 ml-sm-2`}>
          {`(${t(`common:matches`, { count: search.matching ?? 0 })})`}
        </span>
      </Link>

      {removable && (
        <RoundButton
          variant={`red`}
          state={buttonState}
          onClick={handleDelete}
          role={`delete`}
          secondary
        >
          <Close />
        </RoundButton>
      )}
    </div>
  )
}

export default SavedSearch
