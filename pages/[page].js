import Head from "next/head";
import { sanityClient } from "../lib/sanity.js";
import Blocks from "../components/Blocks.js";

const ALL_PAGES_QUERY = `*[_type == "page"]{ slug }`

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  slug,
  pageType,
  blocks[]{
    _type,
    label,
    buttonList,
    tagline_R_V, text_R_V, video_R_V, url_R_V,
    tagline_L_V, text_L_V, video_L_V,
    mainheading, lastupdated, body
  }
}`

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  "slug": slug.current, postType, title,
  "image": image.asset->url,
  publishedAt, postedBy, duration,
  description, blogcategory, blogindustry, blogdepartment
}`

const WHITEPAPERS_QUERY = `*[_type == "whitepaper"] | order(_createdAt desc) {
  "slug": slug.current, title,
  "image": image.asset->url,
  pdfFileUrl, description
}`

export async function getStaticPaths() {
  const pages = await sanityClient.fetch(ALL_PAGES_QUERY)
  const paths = pages.map((p) => ({ params: { page: p.slug.current } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const [page, posts, whitepapers] = await Promise.all([
    sanityClient.fetch(PAGE_QUERY, { slug: params.page }),
    sanityClient.fetch(POSTS_QUERY),
    sanityClient.fetch(WHITEPAPERS_QUERY),
  ])
  if (!page) return { notFound: true }
  return { props: { page, posts, whitepapers } }
}

export default function Page({ page, posts, whitepapers }) {
  return (
    <>
      <Head>
        <title>Nitco Inc.</title>
      </Head>
      <Blocks page={page} posts={posts} whitepapers={whitepapers} />
    </>
  )
}
