import { createContext, useContext, useEffect } from "react";
import useEncLocalstorage from "../hooks/use-enc-local-storage";
import { defaultUserData, usePassword } from "./auth-provider";
import { useClient } from "./client";
import { encrypt } from "../../utils/crypto";

const UserDataContext = createContext(null);

/**
 * @returns { userData { contacts: [], chats: {}, notes: [], todos: []} }
*/
export function useUserData() {
    return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
    const [userData, setUserData] = useEncLocalstorage("syn-msg-user-data-enc", defaultUserData);
    const password = usePassword();
    const client = useClient();

    useEffect(() => {
        client.get("update-user-data", encrypt(password, userData)).then(res => {
            if (res.error) {
                alert(error);
                if (confirm("reload the page"))
                    window.location.reload();
            }
        });
    }, [userData]);

    return (
        <UserDataContext.Provider value={{ userData: JSON.parse(userData), setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
}
