import React from "react";
import Pokeball from "./Pokeball";

const PreloaderItem = () => (
  <div
    className="border border-gray-200 rounded-lg shadow p-5 flex-col flex relative  items-center justify-center pt-20 bg-gray-300"
    data-testid="preloader"
  >
    <div className="h-32 absolute w-32 -top-16">
      <Pokeball
        style={{
          fill: "rgba(225, 225, 225, 0.5)",
        }}
      />
    </div>
    <div className="my-2  bg-white rounded-full w-16 h-4"></div>
    <div className="my-2  bg-white rounded-full w-32 h-5"></div>
    <div className="my-2  bg-white rounded-full w-16 h-6"></div>
  </div>
);

export default function Preloader() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <PreloaderItem key={`preloader-${i}`} />
      ))}
    </>
  );
}
