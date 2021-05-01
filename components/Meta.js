import Head from 'next/head'

const MetaComponent = ({ title, keywords, description }) => {
  return (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
    </>
  )
}

MetaComponent.defaultProps = {
  keywords: 'code snippets',
  description: 'Query your own code snippets archive',
}

export default MetaComponent