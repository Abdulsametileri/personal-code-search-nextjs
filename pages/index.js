import React from "react";
import indexStyles from '@/styles/Index.module.scss'
import DebounceSearch from "@/components/DebounceSearch";
import SnippetList from "@/components/SnippetList";
import Spacer from "@/components/Spacer";
import {PaginateCodeSnippetList} from "@/api/codeSnippet";
import ReactPaginate from "react-paginate"
import {useRouter} from "next/router";

const Index = ({totalCodeSnippets, curPage, maxPage, codeSnippets}) => {
  const router = useRouter()

  const search = async (keyword) => {
    const query = router.query
    query.page = 1
    query.keyword = keyword
    pushNewState(query)
  }

  const handlePagination = page => {
    const query = router.query
    query.page = page.selected + 1
    pushNewState(query)
  }

  const pushNewState = (query) => {
    router.push({
      pathname: router.pathname,
      query: query,
    })
  }

  return (
    <>
      <h3 className="text-center">Total Code Snippets : {totalCodeSnippets}</h3>

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
                codeSnippets
              }/>
              <ReactPaginate
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                previousLabel={"Pre"}
                nextLabel={"Next"}
                breakLabel={"..."}
                initialPage={curPage - 1}
                pageCount={maxPage}
                onPageChange={handlePagination}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination w-100 justify-content-center overflow-scroll'}
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


export async function getServerSideProps({query}) {
  const page = query.page || 1
  const keyword = query.keyword || ""

  const res = await PaginateCodeSnippetList(page, keyword)

  return {props: res}
}

export default Index
