import SnippetItem from "@/components/SnippetItem";

const SnippetList = ({snippets}) => {
  return (
    <>
      {snippets.map((snippet) => (
        <SnippetItem key={snippet._id} snippet={snippet}/>
      ))}
    </>
  )
}

export default SnippetList