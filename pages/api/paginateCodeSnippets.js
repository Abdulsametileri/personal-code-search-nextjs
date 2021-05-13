import Code from "@/models/Code";
import dbConnect from "@/utils/dbConnect";

export default async (req, res) => {
  const curPage = req.query.page || 1
  const perPage = 5

  try {
    await dbConnect()

    const codeSnippets = await Code.find()
      .skip((curPage - 1) * perPage)
      .limit(perPage)
      .sort({"_id": -1})

    const totalCodeSnippets = await Code.find().countDocuments()

    res.status(200).json({
      codeSnippets,
      curPage: curPage,
      maxPage: Math.ceil(totalCodeSnippets / perPage),
      totalCodeSnippets
    })
  } catch (err) {
    res.status(400).json({err})
  }
}