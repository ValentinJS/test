import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { Binder, isBinderActive, getBinderSelectedId } from "react-keys";
import { connect } from "react-redux";

import "./App.css";

const Row = ({ index, style, data }) => {
  let className = index % 2 ? "ListItemOdd" : "ListItemEven";
  className += data.selectedId === index.toString() ? " selected" : "";

  return (
    <button className={className} style={style} id={index}>
      Index {index}
    </button>
  );
};

const Example = ({ isActive, selectedId }) => {
  let ref;
  useEffect(() => {
    ref.scrollToItem(selectedId);
    //activeBinder("ListBinder", selectedId);
  });

  return (
    <Binder id="ListBinder" selector="button" direction="horizontal" active>
      <List
        className="List"
        height={200}
        itemCount={1000}
        itemSize={100}
        itemData={{ selectedId, isActive }}
        width={800}
        // overscanCount={10}
        layout="horizontal"
        ref={(x) => {
          ref = x;
        }}
      >
        {Row}
      </List>
    </Binder>
  );
};

export default connect(() => ({
  isActive: isBinderActive("ListBinder")(),
  selectedId: getBinderSelectedId("ListBinder")(),
}))(Example);
