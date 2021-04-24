import React from "react";
import { RecoilRoot } from 'recoil';
import Dashboard from "./Dashboard";

const App = ({}) => {
  return (
     <RecoilRoot>
        <Dashboard/>
      </RecoilRoot>
  );
};

export default App;
