import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import ComparePage from "./pages/ComparePage"
import ContactPage from "./pages/ContactPage"
import CategoriesPage from "./pages/Categories"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/categories" element={<CategoriesPage/>}/>
      <Route path="/compare/:id" element={<ComparePage />} />
    </Routes>
  )
}

export default App
