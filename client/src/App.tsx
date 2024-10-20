import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import NotFound from "./pages/not_found"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
