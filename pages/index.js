import dbConnect from "@/utils/dbConnect";
import Code from "@/models/Code";
import React, {useState} from "react";
import indexStyles from '@/styles/Index.module.scss'
import DebounceSearch from "@/components/DebounceSearch";
import SnippetList from "@/components/SnippetList";
import Spacer from "@/components/Spacer";
import {SearchInCodeSnippetList} from "@/api/codeSnippet";

const Index = ({allSnippets}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([])

  const search = async (keyword) => {
    setSearchKeyword(keyword)
    let res = await SearchInCodeSnippetList(keyword)
    setSearchResults(res)
  }

  return (
    <>
      <div className={indexStyles.searchContainer}>
        <DebounceSearch
          className={indexStyles.debounceInput}
          onChange={event => search(event.target.value)}
        />
      </div>

      <Spacer bottomVal={25}/>

      {
        allSnippets.length == 0
          ? <p className="text-center">'There is no code snippet to show.'</p>
          : <SnippetList snippets={
            searchKeyword === "" ? allSnippets : searchResults
          }/>
      }
    </>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const result = await Code.find({})
    .sort({"_id": -1}) // -1 mean descending order

  const allSnippets = result.map((doc) => {
    const snippet = doc.toObject()
    snippet._id = snippet._id.toString()
    return snippet
  })

  return {props: {allSnippets}}
}

export default Index
