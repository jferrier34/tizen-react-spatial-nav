import React from "react";
import styled from "styled-components";
import { withFocusable } from "@noriginmedia/react-spatial-navigation";
import { rowHeight } from "./constants";

const CardStyled = styled.div`
  width: 200px;
  height: ${rowHeight}px;
  background-color: aliceblue;
  /* margin: 0; */
  position: absolute;
`;

function Card({ number, topPosition, currentFocus }) {
  const realFocus = number === currentFocus;
  return (
    <CardStyled
      style={{
        // border: `${realFocus ? `${focusedBorderSize}px solid green` : ""}`,
        // zIndex: `${realFocus ? 3 : 1}`,
        top: `${topPosition}px`
      }}
    >
      <p>Hola {number}</p>
    </CardStyled>
  );
}

export default withFocusable()(Card);
