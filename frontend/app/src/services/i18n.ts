import filesize from "filesize"
import i18n from "i18next"
import _ from "lodash"
import { initReactI18next } from "react-i18next"

import { en } from "../translations"

void i18n.use(initReactI18next).init({
  ns: [`common`, `screens`],
  defaultNS: `screens`,
  resources: {
    en,
  },
  lng: `en`,
  fallbackLng: `en`,
  interpolation: {
    format: (value, format, lng) => {
      if (!format) {
        return value
      }

      return format.split(`,`).reduce((value: string, format: string) => {
        switch (format.trim()) {
          case `localeString`:
            return value.toLocaleString()
          case `enIndefiniteArticle`:
          case `enIndefiniteArticleCapitalized`: {
            if (!lng || lng !== `en`) {
              return value
            }

            const letters = [`a`, `e`, `i`, `o`, `u`, `h`]
            const firstLetter = value.substring(0, 1)
            let article = ``
            if (
              letters.find((letter) => firstLetter.toLowerCase() === letter)
            ) {
              article =
                format === `enIndefiniteArticleCapitalized` ? `An` : `an`
            } else {
              article = format === `enIndefiniteArticleCapitalized` ? `A` : `a`
            }

            return `${article} ${value}`
          }
          case `title`: {
            return value
              .toLowerCase()
              .split(` `)
              .map((word: string) => _.upperFirst(word))
              .join(` `)
          }
          case `lowerCase`: {
            return value.toLowerCase()
          }
          case `fileSize`: {
            return filesize(parseInt(value), { round: 0 })
          }
          default:
            return value
        }
      }, value)
    },
  },
})

export default i18n
