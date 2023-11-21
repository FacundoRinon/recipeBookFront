import React from "react";
import ClipLoader from "react-spinners/CircleLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="rgb(214, 88, 42)"
        loading={true}
        cssOverride={override}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
