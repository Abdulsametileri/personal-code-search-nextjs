import aws from 'aws-sdk'
import formidable from 'formidable-serverless'
import fs from 'fs'

/*
because of the Next.js’s body parser converts the image in the body to a
very strange format, you need to first disable that via bodyParser: false flag.
*/
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  }
}

export default async (req, res) => {
  aws.config.update({
    accessKeyId: process.env.PCS_AWS_ACCESS_KEY,
    secretAccessKey: process.env.PCS_AWS_SECRET_KEY,
    region: process.env.PCS_AWS_REGION,
    signatureVersion: 'v4',
  })
  const s3 = new aws.S3()

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) // Account for parsing errors
      return res.status(500)

    const file = fs.readFileSync(files.file.path)
    s3.upload({
      Bucket: process.env.PCS_AWS_BUCKET_NAME,
      ACL: "public-read",
      Key: files.file.name,
      Body: file,
      ContentType: files.file.type,
    })
      .send((err, data) => {
        if (err) {
          return res.status(500)
        }
        if (data) {
          return res.json({
            imageUrl: data.Location,
          })
        }
      })
  })
}