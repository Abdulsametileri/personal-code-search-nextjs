import Nav from "@/components/Nav";
import dbConnect from "@/utils/dbConnect";

const Index = ({ snippets }) => {
  return (
    <>
      {snippets}
      <div>
        <h1>List all code snippets according to search query</h1>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  await dbConnect()

  return { props: { snippets: [] } }
}

export default Index
