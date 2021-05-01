import Nav from "../components/Nav";
import dbConnect from "../utils/dbConnect";

const Index = () => {
  return (
    <div>
      <h1>List all code snippets according to search query</h1>
    </div>
  )
}

export async function getServerSideProps(context) {
  await dbConnect()
}

export default Index
