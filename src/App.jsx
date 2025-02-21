import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { ClientProvider } from "./provider/client";
import { ServerProvider } from "./provider/server";
import { AuthProvider } from "./provider/auth-provider";
import { UserDataProvider } from "./provider/user-data";
import Home from "./pages/home";

export default function App() {
  return (
    <ServerProvider>
      <ClientProvider>
        <AuthProvider>
          <UserDataProvider>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Home />} />
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
          </UserDataProvider>
        </AuthProvider>
      </ClientProvider>
    </ServerProvider>
  );
}
