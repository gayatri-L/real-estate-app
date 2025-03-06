import React from "react";
import PriceMeter from "./PriceMeter";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <PriceMeter currentPrice={10.91} minPrice={10.19} maxPrice={11.32} />
    </div>
  );
}

export default App;
