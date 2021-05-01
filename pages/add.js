import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../styles/Add.module.scss'
import Spacer from "../components/Spacer";
import {useForm} from "react-hook-form";
import CustomFileInput from "../components/CustomFileInput";
import CustomTextArea from "../components/CustomTextArea";
import {AddCodeSnippetToDb, UploadCodeImageToS3} from "../api/codeSnippet";

const add = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();

  const onSubmit = async data => {
    const imageS3Url = await UploadCodeImageToS3(data.image[0]) // await uploadCodeSnippetToS3ReturnUrl(data.image[0])
    if (imageS3Url === "") {
      alert('Error occuring during upload the image to s3')
      return
    }

    const postData = {
      ...data,
      imageUrl: imageS3Url,
    }

    const success = await AddCodeSnippetToDb(postData)
    if (success) {
      reset()
      alert('Uploaded successfully')
    } else {
      alert('Error occuring when trying to attemp add the code snippet')
    }
  };

  return (
    <Form className={styles.formContainer}
          onReset={reset}
          onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center my-2">Add Code Snippet</h3>

      <CustomFileInput
        controlId="snippetImageControl"
        title="Snippet Image"
        inputCssClass={styles.fileGroup}
        errorMsg="Snippet Image is required."
        isInputInvalid={errors.image}
        reactFormProps={register("image", {required: true})}
      />

      <Spacer bottomVal={10} topVal={10}/>

      <CustomTextArea
        controlId="snippetTagControl"
        title="Snippet Tag(s)"
        rows={3}
        errorMsg="At least one tag is required"
        isInputInvalid={errors.tag}
        reactFormProps={register("tag", {required: true})}
      />

      <Spacer bottomVal={10} topVal={10}/>

      <CustomTextArea
        controlId="snippetTagControl"
        title="Snippet Description"
        rows={3}
        errorMsg="Code description is required"
        isInputInvalid={errors.description}
        reactFormProps={register("description", {required: true})}
      />

      <Spacer bottomVal={10} topVal={10}/>

      <div className={styles.buttonContainer}>
        <Button variant="success" type="submit">
          Add
        </Button>
      </div>
    </Form>
  )
}

export default add