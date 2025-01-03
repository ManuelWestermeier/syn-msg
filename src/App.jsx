import { useClient } from "wsnet-client-react";
import Client from "wsnet-client";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

export default function App() {
  const [client, state, reCreateClient, isClosed] = useClient(
    () => {
      const client = new Client("ws://localhost:28028");
      return client;
    },
    true,
    true
  );

  if (state == "failed" || isClosed)
    return (
      <>
        <h3>
          Failed to connect to the server. Please check the server's status or{" "}
          <b>reconnect to the internet</b> and <b>try again</b>.
        </h3>
        <button onClick={reCreateClient}>Retry</button>
        <br />
        <br />
        <i>state:{state}</i>
      </>
    );

  if (!client)
    return (
      <>
        <h3>The loading state can take up to 1 minute. Please wait</h3>
        <i>state:{state}</i>
      </>
    );

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<>App IS WROKING</>} />
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
  );
}
