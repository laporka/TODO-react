import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { About } from "./pages/AboutPage";
import { TodoDetails } from "./pages/TodoDetailsPage";
import { NotFound } from "./pages/NotFoundPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="todos/:id" element={<TodoDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;