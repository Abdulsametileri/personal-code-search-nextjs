import React, {useState} from "react";
import indexStyles from '@/styles/Index.module.scss'
import DebounceSearch from "@/components/DebounceSearch";
import SnippetList from "@/components/SnippetList";
import Spacer from "@/components/Spacer";
import {PaginateCodeSnippetList, SearchInCodeSnippetList} from "@/api/codeSnippet";
import ReactPaginate from "react-paginate"
import {useRouter} from "next/router";

const Index = ({curPage, maxPage, codeSnippets}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()

  const search = async (keyword) => {
    setSearchKeyword(keyword)
    let res = await SearchInCodeSnippetList(keyword)
    setSearchResults(res)
  }

  const handlePagination = page => {
    const path = router.pathname
    const query = router.query
    query.page = page.selected + 1
    router.push({
      pathname: path,
      query: query,
    })
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
        codeSnippets.length == 0
          ? <p className="text-center">'There is no code snippet to show.'</p>
          : <>
            <SnippetList snippets={
              searchKeyword === "" ? codeSnippets : searchResults
            }/>
            <ReactPaginate
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              initialPage={curPage - 1}
              pageCount={maxPage}
              onPageChange={handlePagination}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination w-100 justify-content-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </>
      }
    </>
  )
}

let loadData = true

export async function getServerSideProps({query}) {
  /*if (loadData) {
    await Code.create(data)
    loadData = false
  }*/
  const page = query.page || 1

  const res = await PaginateCodeSnippetList(page)
  console.log(res)

  return {props: res}
}

export default Index
