import { HashRouter, Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { ClientProvider } from "./provider/client";
import { ServerProvider } from "./provider/server";
import { AuthProvider } from "./provider/auth-provider";
import { UserDataProvider } from "./provider/user-data";
import Home from "./pages/chats";
import ChatsPage from "./pages/chats";
import ChatPage from "./pages/chat";

export default function App() {
  return (
    <ServerProvider>
      <ClientProvider>
        <AuthProvider>
          <UserDataProvider>
            <HashRouter>
              <main>
                <Routes>
                  <Route path="/" element={<Navigate to="/chats" />} />
                  <Route path="/chats" element={<ChatsPage />} />
                  <Route path="/chats/:id" element={<ChatPage />} />
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
              </main>
              <nav>
                <NavLink to="/chats" title="Chats">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z" /></svg>
                </NavLink>
                <NavLink to="/contacts" title="Contacts">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" /></svg>
                </NavLink>
                <NavLink to="/todos" title="Todos">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm40-80h200v-80H200v80Zm382-80 198-198-57-57-141 142-57-57-56 57 113 113Zm-382-80h200v-80H200v80Zm0-160h200v-80H200v80Zm-40 400v-560 560Z" /></svg>
                </NavLink>
                <NavLink to="/notes" title="Notes">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h480v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                </NavLink>
              </nav>
            </HashRouter>
          </UserDataProvider>
        </AuthProvider>
      </ClientProvider>
    </ServerProvider>
  );
}
