import Card from "./Card";
import { useEffect, useState } from "react";
import { withFocusable } from "@noriginmedia/react-spatial-navigation";
import { focusedBorderSize, rowHeight } from "./constants";

const mockData = new Array(10).fill(null).map((_, index) => index);
const totalRows = mockData.length;
const rowsOnScreen = 2;
const amountRowsBuffered = 1;

function VirtualizedList({ setFocus }) {
  const [y, setY] = useState(0);
  const [virtualizedList, setVirtualizedList] = useState(
    mockData.slice(0, rowsOnScreen + amountRowsBuffered)
  );

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const onArrowPressHandler = (e, e2, e3, e4) => {
    console.log(e, e2, e3, e4);
    if (e === "up") {
      if (y <= 0) {
        return; // top limit
      }
      setY((prevY) => prevY - 1);
      setVirtualizedList(
        mockData.slice(
          Math.max(y - 1 - amountRowsBuffered, 0),
          y - 1 + rowsOnScreen + amountRowsBuffered
        )
      );
      return;
    }

    if (e === "down") {
      // move only if it is not at the end
      if (y <= totalRows - 2) {
        setY((prevY) => prevY + 1);
      }
      if (y + 2 >= totalRows) {
        return; // avoid overflow mock data
      }
      // if ((y - 1 - amountRowsBuffered) % amountRowsBuffered !== 0) {
      //   return; // OPTIMIZATION: slice each amountRowsBuffered times
      // }
      setVirtualizedList(
        mockData.slice(
          Math.max(y - amountRowsBuffered + 1, 0),
          y + 1 + rowsOnScreen + amountRowsBuffered
        )
      );
    }
  };

  return (
    <div
      className="viewport-root"
      id="root-viewport"
      style={{
        height: `${rowHeight * rowsOnScreen + 10}px`,
        marginTop: `${rowHeight * amountRowsBuffered + 10}px`
      }}
    >
      <div
        className="rows-container"
        style={{
          transform: `translateY(${-y * rowHeight}px)`,
          height: `${totalRows * rowHeight}px`
        }}
      >
        {virtualizedList.map((position) => (
          <Card
            onArrowPress={onArrowPressHandler}
            number={position}
            key={position}
            topPosition={position * rowHeight}
            currentFocus={y} // Foco real sin alocarse
          />
        ))}
      </div>
      <span
        className="focus-border"
        style={{
          width: 200,
          height: 100,
          border: `solid ${focusedBorderSize}px green`
          // top: `${y * rowHeight}px`
        }}
      />
    </div>
  );
}

export default withFocusable({})(VirtualizedList);
