import React from "react";
import ReactMarkdown from "react-markdown";

const CookiePolicy = ({ data }) => {
  const { mainheading, subheading, body } = data;

  return (
    <>
      <div class="container ">
        <div class="row">
          <div class="col-sm-12">
            <div class="markdown-container-fullpage">
              <h1 style={{ paddingTop: "30px" }}>{mainheading}</h1>
              <h3>{subheading}</h3>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CookiePolicy;
