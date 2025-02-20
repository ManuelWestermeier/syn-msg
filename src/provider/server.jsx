import { createContext, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";

const ServerContext = createContext(null);

export const ServerProvider = ({ children }) => {
  const [storedServers, setStoredServers] = useLocalStorage("syn-msg/servers", [
    "ws://localhost:28028",
  ]);
  const [serverUrl, setServerUrl] = useState("");
  const saveServer = () => {
    const serverUrl =
      document.getElementById("serverinput").value ||
      storedServers[0] ||
      "ws://localhost:28028";
    setServerUrl(serverUrl);
    const updatedServers = [...new Set([serverUrl, ...storedServers])];
    setStoredServers(updatedServers);
  };

  if (serverUrl.trim() == "") {
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-xl font-bold">Select Server</h1>
        <input
          type="text"
          id="serverinput"
          className="border p-2 mt-2"
          placeholder="Enter new server URL"
        />
        <button
          onClick={saveServer}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Save Server
        </button>
        <div className="mt-4">
          <h2 className="text-lg">Previously Used:</h2>
          <ul>
            {storedServers.map((server, index) => (
              <li
                key={index}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (!confirm("delete server: " + server)) return;
                  const updatedServers = storedServers.filter(
                    (s) => s !== server
                  );
                  setStoredServers(updatedServers);
                }}
              >
                <button
                  onClick={() => setServerUrl(server)}
                  className="text-blue-500 underline"
                >
                  {server}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <ServerContext.Provider value={serverUrl}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => useContext(ServerContext);
