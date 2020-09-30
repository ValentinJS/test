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

const Example = ({ isActive, selectedId, isActive2, selectedId2 }) => {
  let ref, ref2;
  useEffect(() => {
    ref.scrollToItem(selectedId);
    ref2.scrollToItem(selectedId2);
    //activeBinder("ListBinder", selectedId);
  });

  return (
    <React.Fragment>
      <Binder
        id="ListBinder"
        selector="button"
        direction="horizontal"
        active
        onDownExit="ListBinder2"
      >
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
      <Binder
        id="ListBinder2"
        selector="button"
        direction="horizontal"
        active
        onUpExit="ListBinder"
      >
        <List
          className="List List2"
          height={200}
          itemCount={1000}
          itemSize={100}
          itemData={{ selectedId: selectedId2, isActive: isActive2 }}
          width={800}
          // overscanCount={10}
          layout="horizontal"
          ref={(x) => {
            ref2 = x;
          }}
        >
          {Row}
        </List>
      </Binder>
    </React.Fragment>
  );
};

export default connect(() => ({
  isActive: isBinderActive("ListBinder")(),
  isActive2: isBinderActive("ListBinder2")(),
  selectedId: getBinderSelectedId("ListBinder")(),
  selectedId2: getBinderSelectedId("ListBinder2")(),
}))(Example);
