import * as React from "react";
import AOS from "aos";
import { GoTop } from "./GoTop";

import Link from "next/link";
import Head from "next/head";

export default ({ children }) => {
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <main>{children}</main>
      <GoTop scrollStepInPx="100" delayInMs="10.50" />
    </>
  );
};
