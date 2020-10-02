import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { Binder, isBinderActive, getBinderSelectedId } from "react-keys";
import { connect } from "react-redux";

import "./App.css";

const Row = ({ index, style, data }) => {
  let className = index % 2 ? "ListItemOdd" : "ListItemEven";
  className += data.selectedId === index.toString() ? " selected" : "";
  className += data.isActive ? "  active" : "";

  return (
    <button className={className} style={style} id={index}>
      Index {index}
    </button>
  );
};

const Example = ({
  isActive,
  selectedId,
  isActive2,
  selectedId2,
  isActive3,
  selectedId3,
}) => {
  let ref, ref2, ref3;
  useEffect(() => {
    ref && ref.scrollToItem(selectedId);
    ref2 && ref2.scrollToItem(selectedId2);
    ref3 && ref3.scrollToItem(selectedId3);
  });

  const onScroll = ({
    scrollDirection,
    scrollOffset,
    scrollUpdateWasRequested,
  }) => {
    console.log({
      scrollDirection,
      scrollOffset,
      scrollUpdateWasRequested,
    });
  };

  return (
    <React.Fragment>
      <h1>Ok list</h1>
      <div style={{ width: "100%", height: 200 }}>
        <Binder
          id="ListBinder"
          selector="button"
          direction="horizontal"
          active
          onDownExit="ListBinder2"
          priority={1}
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
            onScroll={onScroll}
          >
            {Row}
          </List>
        </Binder>
      </div>
      <h1>Not ok list: item width float</h1>
      <div style={{ width: "100%", height: 200 }}>
        <Binder
          id="ListBinder2"
          selector="button"
          direction="horizontal"
          active
          onUpExit="ListBinder"
          onDownExit="ListBinder3"
        >
          <List
            className="List"
            height={200}
            itemCount={1000}
            itemSize={100.4}
            itemData={{ selectedId: selectedId2, isActive: isActive2 }}
            width={800}
            // overscanCount={10}
            layout="horizontal"
            ref={(x) => {
              ref2 = x;
            }}
            onScroll={onScroll}
          >
            {Row}
          </List>
        </Binder>
      </div>
      <h1>Not ok list: box overlap</h1>
      <Binder
        id="ListBinder3"
        selector="button"
        direction="horizontal"
        active
        onUpExit="ListBinder2"
      >
        <List
          className="List List2"
          height={200}
          itemCount={1000}
          itemSize={100}
          itemData={{ selectedId: selectedId3, isActive: isActive3 }}
          width={800}
          // overscanCount={10}
          layout="horizontal"
          ref={(x) => {
            ref3 = x;
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
  selectedId: getBinderSelectedId("ListBinder")(),
  isActive2: isBinderActive("ListBinder2")(),
  selectedId2: getBinderSelectedId("ListBinder2")(),
  isActive3: isBinderActive("ListBinder3")(),
  selectedId3: getBinderSelectedId("ListBinder3")(),
}))(Example);
