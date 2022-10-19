import "@testing-library/jest-dom/extend-expect"

import * as React from "react"

jest.mock(
  `react-select`,
  () => ({ id, options, value, onChange, getOptionValue, getOptionLabel }) => {
    function handleChange(event) {
      const option = options.find((option) => {
        const value = getOptionValue?.(option) ?? option.value
        return value.toString() === event.target.value.toString()
      })
      onChange(option)
    }

    return (
      <select id={id} value={value ?? ``} onChange={handleChange}>
        {options.map((item) => {
          const value = getOptionValue?.(item) ?? item.value
          const label = getOptionLabel?.(item) ?? item.label

          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
    )
  },
)

jest.mock(
  `react-select/async`,
  () => ({
    id,
    name,
    className,
    value,
    loadOptions,
    onChange,
    getOptionValue,
    getOptionLabel,
  }) => {
    async function handleLoadOptions(event) {
      try {
        const options = await loadOptions(event.target.value)
        onChange(options[0])
      } catch (err) {}
    }

    return (
      <input
        id={id}
        name={name}
        className={className}
        value={value && getOptionLabel ? getOptionLabel?.(value) : ``}
        data-value-id={value && getOptionValue ? getOptionValue?.(value) : ``}
        type="text"
        onChange={handleLoadOptions}
      />
    )
  },
)

class MockHCaptcha extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetCaptcha = () => {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  execute = () => {}

  render() {
    return (
      <input
        onChange={(e) => this.props.onVerify(e.target.value)}
        data-testid={`hcaptcha`}
      />
    )
  }
}

jest.mock(`@hcaptcha/react-hcaptcha`, () => MockHCaptcha)

jest.mock(`react-input-mask`, () => ({ mask: _mask, ...props }) => (
  <input {...props} />
))

process.env.REACT_APP_API_URL = `https://mock.equedi.com`
process.env.REACT_APP_SHOW_MATCH_PERCENTAGES = `1`
process.env.REACT_APP_COMING_SOON = `0`
process.env.REACT_APP_ENABLE_SENTRY = `0`
