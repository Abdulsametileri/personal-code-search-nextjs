import dbConnect from "@/utils/dbConnect";
import Code from "@/models/Code";

const Index = ({ snippets }) => {
  return (
    <>
      {snippets.map((snippet) => (
        <div key={snippet._id}>
          {snippet.tag} <br/>
          {snippet.description} <br/>
          {snippet.imageUrl}
          <br/>
          <br/>
          <br/>
          <div className="card">
            <img src={snippet.imageUrl} />
          </div>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const result = await Code.find({})
  const snippets = result.map((doc) => {
    const snippet = doc.toObject()
    snippet._id = snippet._id.toString()
    return snippet
  })
  return { props: { snippets } }
}

export default Index
