//Types
import { Styles,Theme } from "react-select"

const select: Partial<Styles> = {
  control: (
    provided: Record<string, any>,
    state: { menuIsOpen: boolean; theme: Theme },
  ) => ({
    ...provided,
    backgroundColor: state.theme.colors.background,
    borderColor: `${
      state.menuIsOpen
        ? state.theme.colors.primary
        : state.theme.colors.neutral10
    } !important`,
    boxShadow: `none`,
  }),
  valueContainer: (provided: Record<string, any>) => ({
    ...provided,
    padding: `4px 12px`,
  }),
  placeholder: (provided: Record<string, any>) => ({
    ...provided,
    fontSize: 16,
    overflow: `hidden`,
    textAlign: `left`,
    textOverflow: `ellipsis`,
    width: `calc(100% - 12px)`,
    whiteSpace: `nowrap`,
  }),
  singleValue: (provided: Record<string, any>) => ({
    ...provided,
    fontSize: 16,
    overflow: `hidden`,
    textAlign: `left`,
    textOverflow: `ellipsis`,
    width: `calc(100% - 12px)`,
    whiteSpace: `nowrap`,
  }),
  indicatorSeparator: (provided: Record<string, any>) => ({
    ...provided,
    display: `none`,
  }),
  menu: (provided: Record<string, any>) => ({
    ...provided,
    zIndex: 10000,
  }),
  option: (provided: Record<string, any>, state: { isSelected: boolean }) => ({
    ...provided,
    fontSize: 16,
    textAlign: `left`,
    backgroundColor: state.isSelected ? `#005DCC !important` : `white`,
    ":hover": {
      backgroundColor: `#e5effa`,
    },
  }),
  noOptionsMessage: (provided: Record<string, any>) => ({
    ...provided,
    fontSize: 16,
    textAlign: `left`,
  }),
  loadingMessage: (provided: Record<string, any>) => ({
    ...provided,
    fontSize: 16,
    textAlign: `left`,
  }),
  input: (provided: Record<string, any>) => ({
    ...provided,
    fontSize: 16,
  }),
}

export default select
