import aws from 'aws-sdk';

export default async (req, res) => {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
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