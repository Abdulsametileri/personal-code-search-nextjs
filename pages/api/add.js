export default (req, res) => {
  const { image, tag, description } = req.body
  console.log(image, tag, description)
  res.status(200).json(req.body)
}