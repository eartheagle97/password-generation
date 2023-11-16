import React from "react";
import "./App.css";
import Header from "./Containers/Header";
import Footer from "./Containers/Footer";
import Content from "./Containers/Content";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
