import aws from 'aws-sdk';

export default async (req, res) => {
  aws.config.update({
    accessKeyId: process.env.PCS_AWS_ACCESS_KEY,
    secretAccessKey: process.env.PCS_AWS_SECRET_KEY,
    region: process.env.PCS_AWS_REGION,
    signatureVersion: 'v4',
  });
  console.log(process.env.PCS_AWS_ACCESS_KEY)
  const params = {
    Bucket: process.env.PCS_AWS_BUCKET_NAME,
    Key: req.query.fileName,
    Body: req.body
  };

  const s3 = new aws.S3();

  const data = await s3.upload(params).promise()
  const { Location: imageUrl } = data

  res.json({
    imageUrl: imageUrl
  })
}