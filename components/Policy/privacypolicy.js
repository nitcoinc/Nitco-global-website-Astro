import React from "react";
import ReactMarkdown from "react-markdown";

const PrivacyPolicy = ({ data }) => {
  const {
    mainheading,
    lastupdated,
    body
  } = data;

  return (
    <>
      <div class="container policy-container">
        <div class="row">
          <div class="col-sm-12">
          <div class="markdown-container-fullpage">
            <h1>{mainheading}</h1>
            <p>Last Updated: {lastupdated}</p>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PrivacyPolicy;
