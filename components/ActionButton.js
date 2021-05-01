import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import React from "react";

const ActionButton = (props) => {
  let {disabledState, buttonText} = props

  return (
    <Button
      disabled={disabledState}
      type="submit"
      variant="success">

      {disabledState &&
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      }
      {disabledState ? 'Loading' : buttonText}
    </Button>
  )
}
export default ActionButton;