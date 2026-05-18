export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const UserPartsFragmentDoc = gql`
    fragment UserParts on User {
  __typename
  users {
    __typename
    username
    name
    email
    password {
      value
      passwordChangeRequired
    }
  }
}
    `;
export const NavBarPartsFragmentDoc = gql`
    fragment NavBarParts on NavBar {
  __typename
  navbarImage
}
    `;
export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  slug
  pageType
  blocks {
    __typename
    ... on PageBlocksHomePageBlock {
      HeadingOfMainBanner
      TextOfMainBanner
      ContactUsButton
      ContactUsButtonLink
      mainFeatureList {
        __typename
        featureheading
        featureImage
        featuredescription
        featureurl
      }
      serviceheading
      servicetext
      serviceslist {
        __typename
        servicesName
        urlForservices
      }
      servicesImage
      designImage
      designheading
      designtext
      designs {
        __typename
        designName
      }
      ourFeatureheading
      ourFeaturetext
      ourfeatureslist {
        __typename
        featureName
        featureDescription
      }
      funfactheading
      funfacttext
      funfactcontactheading
      funfactcontacttext
      funfactcontactarea
      factslist {
        __typename
        factsnumbers
        factsfield
      }
      RecentCaseWorks {
        __typename
        caseHeading
        casetext
        casestudyimage
        slug
      }
    }
    ... on PageBlocksBlogBlock {
      blogpost {
        __typename
        blogimage
        postedon
        headingpro
        postedBy
        duration
        description
        slug
        blogcategory
        blogcategory2
        blogindustry
        blogdepartment
      }
      industriesheading
      industries {
        __typename
        industriesdesc
      }
      deptheading
      departments {
        __typename
        departmentsdesc
      }
      catheading
      categories {
        __typename
        catdesc
      }
    }
    ... on PageBlocksButtonBlock {
      buttonList {
        __typename
        name
        url
      }
    }
    ... on PageBlocksCaseStudiesDetailsBlock {
      title
      image
      body
    }
    ... on PageBlocksCaseStudiesBlock {
      casestudies {
        __typename
        heading
        casedesc
        caseimage
        postedBy
        postedon
        duration
        slug
        casestudytopic
        casestudytopic1
        casestudytopic2
        casestudyindustry
        casestudydepartment
      }
      casestudyindustriesheading
      caseStudyindustries {
        __typename
        casestudydesc
      }
      casestudydeptheading
      casestudydepartments {
        __typename
        casestudydepartmentsdesc
      }
      casestudyptopicheading
      casestudytopic {
        __typename
        casestudytopicdesc
      }
    }
    ... on PageBlocksCookieTypesBlock {
      mainheading
      subheading
      body
    }
    ... on PageBlocksLeftVideoBlock {
      tagline_L_V
      text_L_V
      video_L_V
      url_L_V
      navigation_text_L_V
      list_L_V {
        __typename
        subHeading_L_V
        subContent_L_V
      }
    }
    ... on PageBlocksNewsBlock {
      services {
        __typename
        newsconcept
        newstext
        file
        slug
        postedBy
        postedon
        duration
        newstopic
        newsindustry
        newsdepartment
      }
      newsindustriesheading
      newsindustries {
        __typename
        newsindustriesdesc
      }
      newsdeptheading
      newsdepartments {
        __typename
        newsdepartmentsdesc
      }
      newstopicheading
      newstopics {
        __typename
        newstopicdesc
      }
    }
    ... on PageBlocksPagebannerblock {
      pageTitle
    }
    ... on PageBlocksPolicydefinitionsBlock {
      mainheading
      lastupdated
      body
    }
    ... on PageBlocksRightVideoBlock {
      tagline_R_V
      text_R_V
      video_R_V
      url_R_V
      navigation_text_R_V
      subContent_R_V
      list_R_V {
        __typename
        subHeading_R_V
        keyPointsRI {
          __typename
          keypoint_R_V
        }
      }
    }
    ... on PageBlocksWhitePapersBlock {
      whitepaperslist {
        __typename
        image
        slug
        heading
        postedBy
        postedon
        duration
        description
        whitepapertopic
        whitepapertopic2
        whitepaperindustry
        whitepaperdepartment
      }
      whitepaperindustriesheading
      whitepaperindustries {
        __typename
        whitepaperdesc
      }
      whitepaperdeptheading
      whitepaperdepartments {
        __typename
        whitepaperdepartmentsdesc
      }
      whitepapertopicheading
      whitepapertopic {
        __typename
        whitepapertopicdesc
      }
    }
    ... on PageBlocksWebinarBlock {
      webinars {
        __typename
        webinarConcept
        webinarText
        webinarImage
        postedBy
        postedon
        duration
        slug
        webinartopic
        webinarindustry
        webinardepartment
      }
      webinarindustriesheading
      webinarindustries {
        __typename
        webinardesc
      }
      webinardeptheading
      webinardepartments {
        __typename
        webinardepartmentsdesc
      }
      webinartopicheading
      webinartopic {
        __typename
        webinartopicdesc
      }
    }
  }
}
    `;
export const AllPostsPartsFragmentDoc = gql`
    fragment AllPostsParts on AllPosts {
  __typename
  slug
  pageType
  pagetype
  title
  image
  date
  body
}
    `;
export const WhitepapersPartsFragmentDoc = gql`
    fragment WhitepapersParts on Whitepapers {
  __typename
  slug
  pageType
  pagetype
  title
  image
  body
  pdfFileUrl
}
    `;
export const SeoPartsFragmentDoc = gql`
    fragment SeoParts on Seo {
  __typename
  path
  title
  description
  canonical
}
    `;
export const UserDocument = gql`
    query user($relativePath: String!) {
  user(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;
export const UserConnectionDocument = gql`
    query userConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: UserFilter) {
  userConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...UserParts
      }
    }
  }
}
    ${UserPartsFragmentDoc}`;
export const NavBarDocument = gql`
    query navBar($relativePath: String!) {
  navBar(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NavBarParts
  }
}
    ${NavBarPartsFragmentDoc}`;
export const NavBarConnectionDocument = gql`
    query navBarConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NavBarFilter) {
  navBarConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NavBarParts
      }
    }
  }
}
    ${NavBarPartsFragmentDoc}`;
export const PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
export const PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
export const AllPostsDocument = gql`
    query allPosts($relativePath: String!) {
  allPosts(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AllPostsParts
  }
}
    ${AllPostsPartsFragmentDoc}`;
export const AllPostsConnectionDocument = gql`
    query allPostsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AllPostsFilter) {
  allPostsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AllPostsParts
      }
    }
  }
}
    ${AllPostsPartsFragmentDoc}`;
export const WhitepapersDocument = gql`
    query whitepapers($relativePath: String!) {
  whitepapers(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...WhitepapersParts
  }
}
    ${WhitepapersPartsFragmentDoc}`;
export const WhitepapersConnectionDocument = gql`
    query whitepapersConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: WhitepapersFilter) {
  whitepapersConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...WhitepapersParts
      }
    }
  }
}
    ${WhitepapersPartsFragmentDoc}`;
export const SeoDocument = gql`
    query seo($relativePath: String!) {
  seo(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SeoParts
  }
}
    ${SeoPartsFragmentDoc}`;
export const SeoConnectionDocument = gql`
    query seoConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SeoFilter) {
  seoConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SeoParts
      }
    }
  }
}
    ${SeoPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    user(variables, options) {
      return requester(UserDocument, variables, options);
    },
    userConnection(variables, options) {
      return requester(UserConnectionDocument, variables, options);
    },
    navBar(variables, options) {
      return requester(NavBarDocument, variables, options);
    },
    navBarConnection(variables, options) {
      return requester(NavBarConnectionDocument, variables, options);
    },
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    },
    allPosts(variables, options) {
      return requester(AllPostsDocument, variables, options);
    },
    allPostsConnection(variables, options) {
      return requester(AllPostsConnectionDocument, variables, options);
    },
    whitepapers(variables, options) {
      return requester(WhitepapersDocument, variables, options);
    },
    whitepapersConnection(variables, options) {
      return requester(WhitepapersConnectionDocument, variables, options);
    },
    seo(variables, options) {
      return requester(SeoDocument, variables, options);
    },
    seoConnection(variables, options) {
      return requester(SeoConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
