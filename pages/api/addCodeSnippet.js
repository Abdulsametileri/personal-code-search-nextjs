import dbConnect from "@/utils/dbConnect";
import Code from "@/models/Code";

export default async (req, res) => {
  const { imageUrl, rawText, tag, description } = req.body

  await dbConnect()

  try {
    const addedCode = await Code.create({
      imageUrl,
      rawText,
      tag,
      description
    })
    res.status(201).json({ success: true, data: addedCode })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}