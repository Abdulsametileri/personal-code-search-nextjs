import {DebounceInput} from "react-debounce-input";
import React from "react";

const DebounceSearch = ({className, onChange}) => {
  return (
    <DebounceInput
      className={className}
      placeholder="Search..."
      debounceTimeout={process.env.NODE_ENV === 'development' ? 100 : 1000}
      onChange={onChange}/>
  )
}
export default DebounceSearch;