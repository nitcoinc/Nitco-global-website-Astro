import * as React from "react"
import { client } from "../../tina/__generated__/client";

import Page from "../../components/Page";

export default (props) => <Page {...props} />;

export async function getStaticPaths() {
    const pagesResponse = await client.queries.pageConnection({
        filter: { pageType: { eq: "solutions" } }
    });

    let paths = pagesResponse?.data?.pageConnection?.edges
        ?.map(({ node }) => node)
        ?.reduce((ps, { _sys }) => {
            const filename = _sys.filename.split("__")[1];
            if (filename != null) ps.push({
                params: { page: filename }
            });
            return ps;
        }, []);
    paths = paths != null ? paths : [];

    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const pageName = context.params.page;
    
    const { data, query, variables } = await client.queries.page({
        relativePath: `solutions__${pageName}.mdx`,
    });

    return {
        props: {
            data,
            query,
            variables
        },
    };
};
