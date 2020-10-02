import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { Binder, isBinderActive, getBinderSelectedId } from "react-keys";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";

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
    ref && ref.scrollToItem(selectedId);
    ref2 && ref2.scrollToItem(selectedId2);
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
      <div style={{ width: "100%", height: 200 }}>
        <AutoSizer>
          {({ width, height }) => (
            <Binder
              id="ListBinder"
              selector="button"
              direction="horizontal"
              active
              onDownExit="ListBinder2"
            >
              <List
                className="List"
                height={height}
                itemCount={1000}
                itemSize={100.4}
                itemData={{ selectedId, isActive }}
                width={width}
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
          )}
        </AutoSizer>
      </div>
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
