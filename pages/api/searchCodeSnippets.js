import dbConnect from "@/utils/dbConnect";
import Code from "@/models/Code";

export default async (req, res) => {
  await dbConnect()

  const { keyword } = req.query;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(keyword);

  try {
    const snippets = await Code.find({
      $or: [
        { tag: { $regex: searchRgx, $options: "i" } },
        { description: { $regex: searchRgx, $options: "i" } },
      ],
    })
    res.status(200).json(snippets);
  } catch (e) {
    res.status(400).json([]);
  }
}
