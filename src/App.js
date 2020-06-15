import React from "react";
import "./App.css";

import Container from "@material-ui/core/Container";

import TopBar from "./components/TopBar/TopBar";
import MainTable from "./components/MainTable/MainTable";

function App() {
  return (
    <div>
      <TopBar />
      <Container className='MainContent'>
        <MainTable />
      </Container>
    </div>
  );
}

export default App;
