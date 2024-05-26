import { Routes, Route } from "react-router-dom";

import Barang from "./pages/Barang";
import Supplier from "./pages/Supplier";
import Transaksi from "./pages/Transaksi";

import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <div className="app">
      <NavbarComponent />
      <Routes>
        <Route path="/" Component={Transaksi} />
        <Route path="/barang" Component={Barang} />
        <Route path="/supplier" Component={Supplier} />
      </Routes>
    </div>
  );
}

export default App;
