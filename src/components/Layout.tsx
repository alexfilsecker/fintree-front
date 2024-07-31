import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return <div className="flex justify-center m-1">{children}</div>;
};

export default Layout;
