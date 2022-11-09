import React from "react";
import OwnItemBlock from "./OwnItemBlock";

const BrowserGrid = ({ items, searchStartDate, searchEndDate}) => {
  const mappedItems = items.map((item, index) => {
    return (
      <OwnItemBlock
        item={item}
        key={index}
        searchEndDate={searchEndDate}
        searchStartDate={searchStartDate}
      />
    );
  });

  return (
    <>
      <div className="itemGrid">{mappedItems}</div>
    </>
  );
};

export default BrowserGrid;
