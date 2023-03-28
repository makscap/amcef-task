import React from "react";
import { Oval } from "react-loader-spinner";

function Spinner({ width }) {
  return (
    <div>
      <Oval
        height={width}
        width={width}
        color="#235243"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#235243"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
export default Spinner;
