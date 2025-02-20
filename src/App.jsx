import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { ClientProvider } from "./provider/client";

export default function App() {
  return (
    <ClientProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<>App IS WORKING</>} />
          <Route
            path="*"
            element={
              <>
                <h3>404 Page not found</h3>
                <Link to="/">Home</Link>
              </>
            }
          />
        </Routes>
      </HashRouter>
    </ClientProvider>
  );
}
