// @flow
import * as React from "react";

export default function Error({ children }: { children: React.Node }) {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      Oops, something went wrong! <br /> {children}
    </div>
  );
}

Error.defaultProps = {
  children: ""
};
