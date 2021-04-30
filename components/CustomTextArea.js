import Form from "react-bootstrap/Form";

const CustomTextArea = (props) => {
  const {controlId, title, rows, isInputInvalid, errorMsg, reactFormProps} = props

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        {...reactFormProps}
        isInvalid={isInputInvalid}
        as="textarea" rows={rows}/>
      <Form.Control.Feedback type="invalid">
        {errorMsg}
      </Form.Control.Feedback>
    </Form.Group>
  )
}
export default CustomTextArea;