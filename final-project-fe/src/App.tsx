import {Routes, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Navbar} from "./components/Navbar";
import ProductList from "./pages/products/list";
function App() {
    return (
        <>
            <Navbar />
            <Container className="mb-4">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/about" element={<About />} />
              </Routes>
             </Container>
        </>
    )
}
export default App
