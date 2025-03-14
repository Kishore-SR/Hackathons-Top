import React from "react";
import "./Loading.css"

export const Loading = () => {
  return (
    <>
      <div class="loader">
        <div class="loading-text">
          Loading<span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </div>
        <div class="loading-bar-background">
          <div class="loading-bar">
            <div class="white-bars-container">
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
