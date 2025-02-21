import useLocalStorage from "use-local-storage";
import { decrypt, encrypt } from "../../utils/crypto";
import { usePassword } from "../provider/auth-provider";

export default function useEncLocalstorage(key, defaultVlaue) {
    const password = usePassword();
    const [data, setData] = useLocalStorage(key, encrypt(password, defaultVlaue));

    const decryptedData = decrypt(password, data);
    const setDecryptedData = (data) => {
        if (data instanceof Function)
            return setData(encrypt(password, data(decryptedData)));
        else return setData(encrypt(password, data));
    };

    return [decryptedData, setDecryptedData];
}