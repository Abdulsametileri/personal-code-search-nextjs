import dbConnect from "@/utils/dbConnect";
import Code from "@/models/Code";
import React from "react";
import indexStyles from '@/styles/Index.module.scss'
import DebounceSearch from "@/components/DebounceSearch";
import SnippetList from "@/components/SnippetList";
import Spacer from "@/components/Spacer";

const Index = ({snippets}) => {
  return (
    <>
      <div className={indexStyles.searchContainer}>
        <DebounceSearch
          className={indexStyles.debounceInput}
          onChange={event => console.log(event.target.value)}
        />
      </div>

      <Spacer bottomVal={25}/>

      {
        snippets.length == 0
          ? 'There is no code snippet to show.'
          : <SnippetList snippets={snippets}/>
      }
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
  return {props: {snippets}}
}

export default Index
