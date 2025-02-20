import { createContext, useContext } from "react";
import { useClient as useClientConnection } from "wsnet-client-react";
import Client from "wsnet-client";
import { useServer } from "./server";

const ClientContext = createContext(null);

export function useClient() {
	return useContext(ClientContext);
}

export function ClientProvider({ children }) {
	const serverUrl=useServer();
	const [client, state, reCreateClient, isClosed] = useClientConnection(
		() => new Client(serverUrl),
		true,
		true
	);

	if (state === "failed" || isClosed)
		return (
			<>
				<h3>
					Failed to connect to the server. Please check the server's status or{" "}
					<b>reconnect to the internet</b> and <b>try again</b>.
				</h3>
				<button onClick={reCreateClient}>Retry</button>
				<br />
				<br />
				<i>state: {state}</i>
			</>
		);

	if (!client)
		return (
			<>
				<h3>The loading state can take up to 1 minute. Please wait</h3>
				<i>state: {state}</i>
			</>
		);

	return (
		<ClientContext.Provider value={{ client, state, reCreateClient, isClosed }}>
			{children}
		</ClientContext.Provider>
	);
}
