import Form from 'react-bootstrap/Form'
import styles from '@/styles/Add.module.scss'
import Spacer from "@/components/Spacer";
import {useForm} from "react-hook-form";
import CustomFileInput from "@/components/CustomFileInput";
import CustomTextArea from "@/components/CustomTextArea";
import {AddCodeSnippetToDb, UploadCodeImageToS3} from "@/api/codeSnippet";
import {ShowErrorMessage, ShowSuccessMessage} from "@/utils/messageBox";
import ActionButton from "@/components/ActionButton";
import {useRouter} from 'next/router'
import React, {useEffect, useState} from "react";
import firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from "react-bootstrap/Button";

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const codeType = {
  image: 1,
  text: 2,
}

const add = () => {
  const router = useRouter()
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [isCodeType, setCodeType] = useState(codeType.image)
  const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const allowedEmails = process.env.NEXT_PUBLIC_ALLOW_EMAILS.split(',')

        if (allowedEmails.includes(user.email)) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
          ShowErrorMessage("You cannot access this page. You must add your email. Sorry.")
          firebase.auth().signOut()
          setTimeout(() => {
            router.reload()
          }, 2000)
        }
      }
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>Personal Code Search</h1>
        <p>In order to add questions/solutions on your own, Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }

  const onSubmit = async data => {
    const postData = {
      ...data,
    }

    if (!data.rawText || data.rawText === "") {
      const imageS3Url = await UploadCodeImageToS3(data.image[0])
      if (imageS3Url === "") {
        ShowErrorMessage('Error occuring during upload the image to s3.')
        return
      }
      postData.imageUrl = imageS3Url
    }
    console.log(postData)
    const success = await AddCodeSnippetToDb(postData)
    if (success) {
      ShowSuccessMessage('Code snippet has been added successfully. 👊')
      reset()
      await router.replace('/')
    } else {
      ShowErrorMessage('Error occuring when trying to attempt add the code snippet to database. 😭')
    }
  };

  return (
    <Form className={styles.formContainer}
          onReset={reset}
          onSubmit={handleSubmit(onSubmit)}>

      <h3 className="text-center my-2">Add Code Snippet</h3>

      <Form.Check
        id="image"
        label="Image"
        type="radio"
        checked={isCodeType === codeType.image}
        value={codeType.image}
        onChange={() => setCodeType(codeType.image)}
      />

      <Form.Check
        id="text"
        label="Code as Raw Text"
        type="radio"
        checked={isCodeType === codeType.text}
        value={codeType.text}
        onChange={() => setCodeType(codeType.text)}
      />

      {isCodeType === codeType.image && <CustomFileInput
        controlId="snippetImageControl"
        title="Snippet Image"
        inputCssClass={styles.fileGroup}
        errorMsg="Snippet Image is required."
        isInputInvalid={errors.image}
        reactFormProps={register("image")}
      />}

      {isCodeType === codeType.text && <CustomTextArea
        controlId="snippetRawTextControl"
        title="Snippet Raw Text"
        rows={15}
        errorMsg="You cannot empty this field"
        isInputInvalid={errors.rawText}
        reactFormProps={register("rawText")}
      />}

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
        <ActionButton
          disabledState={isSubmitting}
          buttonText="Add"
        />
      </div>

      <div className="w-100 mt-3">
        <p className="mb-0">
          <Button variant="danger"
                  onClick={() => firebase.auth().signOut().then(() => router.reload())}>Sign-out</Button>
          {' '}
          You are signed as {firebase.auth().currentUser.displayName}! If you exit
        </p>
      </div>
    </Form>
  )
}

export default add