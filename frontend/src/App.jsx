import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";
import DeleteBook from "./pages/DeleteBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/books" element={CreateBook} />
      <Route path="/books/:id" element={UpdateBook} />
      <Route path="/books/:id" element={DeleteBook} />
    </Routes>
  );
}

export default App;
