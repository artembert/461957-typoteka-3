import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

interface LayoutAdminProps {}

export const LayoutAdmin: FunctionComponent<LayoutAdminProps> = ({children}) => (
  <Layout isBackgroundHidden={true} header={<Header />} footer={<Footer isLargeIndent={true} />}>
    {children}
  </Layout>
);