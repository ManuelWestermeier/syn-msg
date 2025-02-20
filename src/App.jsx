import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { ClientProvider } from "./provider/client";
import { ServerProvider } from "./provider/server";
import { AuthProvider } from "./provider/auth-provider";

export default function App() {
  return (
    <ServerProvider>
      <ClientProvider>
        <AuthProvider>
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
        </AuthProvider>
      </ClientProvider>
    </ServerProvider>
  );
}
