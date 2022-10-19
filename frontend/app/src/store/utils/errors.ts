import { AxiosError } from "axios"

//Services
import i18n from "../../services/i18n"
import { APIError } from "../types/errors"

export const handleError = (err: AxiosError): APIError => {
  if (err.response?.data) {
    return err.response?.data
  }

  if (process.env.REACT_APP_ENABLE_SENTRY === `0`) {
    console.error(err)
  }

  return {
    errors: null,
    message: i18n.t(`errors:somethingGoneWrong`),
  }
}
