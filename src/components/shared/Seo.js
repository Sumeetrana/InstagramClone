import React from "react";
import Helmet from "react-helmet";

function SEO({ title }) {
  const titleText = title ? `${title} • Instagram` : "Instagram";
  return (
    <Helmet>
      <title>{titleText}</title>
      {/* Can put meta tag, keywords, descriptions also inside here */}
    </Helmet>
  );
}

export default SEO;
