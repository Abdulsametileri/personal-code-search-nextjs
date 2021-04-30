import Form from "react-bootstrap/Form";

const CustomFileInput = (props) => {
  const {controlId, title, inputCssClass, errorMsg, reactFormProps, isInputInvalid } = props
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{title}</Form.Label>

      <Form.File custom>
        <Form.File.Input
          {...reactFormProps}
          isInvalid={isInputInvalid}
          className={inputCssClass}
          accept="image/png, image/jpeg"
        />
        <Form.Control.Feedback type="invalid">
          {errorMsg}
        </Form.Control.Feedback>
      </Form.File>
    </Form.Group>
  )
}
export default CustomFileInput;