import React from "react";
import shots from "./ShotsData";
import { Tooltip } from "@mui/material";
import "./gamecss.css";

const Game = () => {
  return (
    <div>
      <h1>Game - Highlights of Shots</h1>

      <div className="game-area">
        <div className="shots">
          {shots.map((item) => {
            let topValue = 0,
              leftValue = 0;
            let text = "";
            if (item.color === `red`) {
              text = "nearest shot";
              topValue = Math.ceil(Math.random() * 25) + 10;
              leftValue = Math.ceil(Math.random() * 90);
            } else if (item.color === "white") {
              text = "farthest shot";
              topValue = Math.ceil(Math.random() * 20) + 70;
              leftValue = Math.ceil(Math.random() * 90);
            } else {
              text = "middle shot";
              topValue = Math.ceil(Math.random() * 35) + 40;
              leftValue = Math.ceil(Math.random() * 90);
            }
            return (
              <Tooltip title={text}>
                <div
                  style={{
                    left: `${leftValue}%`,
                    top: `${topValue}%`,
                    zIndex: "100",
                  }}
                  className={`shot ${item.color}`}
                  key={item.id}
                ></div>
              </Tooltip>
            );
          })}
        </div>
        <div className="goal-area"></div>
        <div className="opposite-area">
          <div className="line"></div>
          <div className="line2"></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
