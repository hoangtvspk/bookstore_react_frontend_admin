import React from "react";

const PageTitle: React.FC = ({ children }) => {
  return (
    <h4 style={{ paddingLeft: "100px", paddingTop: "30px" }}>{children}</h4>
  );
};

export default PageTitle;
