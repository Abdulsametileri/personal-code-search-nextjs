import {DebounceInput} from "react-debounce-input";
import React from "react";

const DebounceSearch = ({className, onChange}) => {
  return (
    <DebounceInput
      className={className}
      minLength={3}
      placeholder="Search..."
      debounceTimeout={1000}
      onChange={onChange}/>
  )
}
export default DebounceSearch;