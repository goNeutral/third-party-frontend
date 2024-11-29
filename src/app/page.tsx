import React from "react";
import Login from "@/components/Login";

const HomePage = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <Login />
    </div>
  );
}

export default HomePage;
