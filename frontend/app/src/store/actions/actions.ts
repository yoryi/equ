/* eslint-disable @typescript-eslint/ban-types */
import { Action } from "redux"

import * as Types from "../types"

export interface PayloadAction<T> extends Action {
  payload: T
}

export interface PromiseAction<T> extends PayloadAction<T> {
  meta: {
    promise: {
      resolve: Function
      reject: Function
    }
  }
  then: Function
  catch: Function
  finally: Function
}

export interface ErrorAction extends Action {
  err: Error
}

export interface APIErrorAction extends Action {
  err: Types.APIError
}
