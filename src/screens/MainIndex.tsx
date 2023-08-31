import React, { lazy } from "react";


const Gallery = lazy(() => import("../components/Gallery/Gallery"));
const Header = lazy(() => import("../components/common/Header"));

const MainIndex = () => {
  return (
    <>
      <div className="main px-lg-4 px-md-4">
        <Header />
        <div className="body d-flex py-lg-3 py-md-2">
          <Gallery />
        </div>
      </div>
    </>
  );
};

export default MainIndex;
