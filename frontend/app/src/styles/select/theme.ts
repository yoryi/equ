import { Theme } from "react-select"

export const defaultTheme = (provided: Theme): Theme => ({
  ...provided,
  borderRadius: 6,
  colors: {
    ...provided.colors,
    primary: `#005dcc`,
    primary75: `#CCDFF5`,
    primary50: `#e5effa`,
    neutral10: `#EAEBEB`,
    neutral50: `#707378`,
    background: `#FFFFFF`,
  },
})

export const errorTheme = (provided: Theme): Theme => ({
  ...provided,
  borderRadius: 6,
  colors: {
    ...provided.colors,
    primary: `#C91C0D`,
    primary75: `#FAE8E7`,
    primary50: `#FAE8E7`,
    neutral10: `#C91C0D`,
    neutral50: `#C91C0D`,
    background: `#FAE8E7`,
  },
})
