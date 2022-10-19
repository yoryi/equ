import React from "react"
import Autosuggest from "react-autosuggest"

import { HighSchool } from "../../store/types"

interface AutosuggestFieldProps {
  values: HighSchool[]
  placeholder: string
  value: string
  setValue: any
  styles: any
}

const AutosuggestField: React.FC<AutosuggestFieldProps> = ({
  values,
  value,
  setValue,
  placeholder,
  styles,
}) => {
  const {
    input,
    suggestionsContainer,
    suggestion,
    suggestionHighlighted,
    container,
    suggestionsList,
  } = styles

  const renderSuggestion = (suggestion: any) => <div>{suggestion.name}</div>

  const getSuggestionValue = (suggestion: any) => suggestion.name

  const onChange = (
    _e: React.ChangeEvent<HTMLInputElement>,
    { newValue: name }: any,
  ) => {
    setValue({ name })
  }

  const inputProps = {
    placeholder,
    value,
    onChange,
  }

  return (
    <Autosuggest
      suggestions={values && values.length > 0 ? values : []}
      onSuggestionsFetchRequested={() => undefined}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={(_event, { suggestion }) => setValue(suggestion)}
      inputProps={inputProps}
      multiSection={false}
      focusInputOnSuggestionClick={false}
      theme={{
        input,
        container,
        suggestionsContainer,
        suggestion,
        suggestionHighlighted,
        suggestionsList,
      }}
    />
  )
}

export default AutosuggestField
