interface Config {
  baseURL: string | null
}

export const config: Config = {
  baseURL: null,
}

export const initReduxStore = (baseURL: string) => {
  config.baseURL = baseURL
}
