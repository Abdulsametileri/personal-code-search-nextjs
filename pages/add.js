import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../styles/Add.module.scss'
import Spacer from "../components/Spacer";
import { useForm } from "react-hook-form";
import CustomFileInput from "../components/CustomFileInput";
import CustomTextArea from "../components/CustomTextArea";

const add = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const uploadCodeSnippetToS3ReturnUrl = async file => {
    const filename = encodeURIComponent(file.name);

    const formData = new FormData();
    formData.append("file", file)

    try {
      const res  = await fetch(`/api/uploadSnippetToS3?fileName=${filename}`, {
        method: 'POST',
        body: formData,
      });
      const { imageUrl } = await res.json()
      return imageUrl
    } catch (e) {
      console.error(e)
      return ""
    }
  }

  const onSubmit = async data => {
      const imageS3Url = await uploadCodeSnippetToS3ReturnUrl(data.image[0])
      console.log(imageS3Url)
  };

  return (
    <Form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center my-2">Add Code Snippet</h3>

      <CustomFileInput
        controlId="snippetImageControl"
        title="Snippet Image"
        inputCssClass={styles.fileGroup}
        errorMsg="Snippet Image is required."
        isInputInvalid={errors.image}
        reactFormProps={register("image", { required: true })}
      />

      <Spacer bottomVal={10} topVal={10} />

      <CustomTextArea
        controlId="snippetTagControl"
        title="Snippet Tag(s)"
        rows={3}
        errorMsg="At least one tag is required"
        isInputInvalid={errors.tag}
        reactFormProps={register("tag", { required: true })}
      />

      <Spacer bottomVal={10} topVal={10} />

      <CustomTextArea
        controlId="snippetTagControl"
        title="Snippet Description"
        rows={3}
        errorMsg="Code description is required"
        isInputInvalid={errors.description}
        reactFormProps={register("description", { required: true })}
      />

      <Spacer bottomVal={10} topVal={10} />

      <div className={styles.buttonContainer}>
        <Button variant="success" type="submit">
          Add
        </Button>
      </div>
    </Form>
  )
}

export default add