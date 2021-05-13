import Code from "@/models/Code";
import dbConnect from "@/utils/dbConnect";

export default async (req, res) => {
  const keyword = req.query.keyword;
  const curPage = req.query.page || 1
  const perPage = 5

  try {
    await dbConnect()

    let filter = {}

    if (keyword !== "") {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(keyword);
      filter = {
        $or: [
          {tag: {$regex: searchRgx, $options: "i"}},
          {description: {$regex: searchRgx, $options: "i"}},
        ],
      }
    }

    const codeSnippets = await Code.find(filter)
      .skip((curPage - 1) * perPage)
      .limit(perPage)
      .sort({"_id": -1})

    const totalCodeSnippets = await Code
      .find(filter)
      .countDocuments()

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