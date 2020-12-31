import React from "react";
import { useLayoutStyles } from "../../styles";
// import SEO from "./Seo";

function Layout({ children }) {
  const classes = useLayoutStyles();

  return (
    <section className={classes.section}>
      {/* <SEO /> */}
      <main className={classes.main}>
        <section className={classes.childrenWrapper}>
          <div className={classes.children}>{children}</div>
        </section>
      </main>
    </section>
  );
}

export default Layout;
