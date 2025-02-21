import CryptoJS from "crypto-js";

export function randomBytes(length) {
    return CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Hex);
}

// Encrypt AES
export function encrypt(password = "", data = "") {
    const salt = randomBytes(32);
    const encrypted = CryptoJS.AES.encrypt(data, salt + password).toString();
    return salt + encrypted;
}

// Decrypt AES
export function decrypt(password = "", data = "") {
    const salt = data.slice(0, 64);
    const rawData = data.slice(64);
    const bytes = CryptoJS.AES.decrypt(rawData, salt + password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

// SHA-256 Hash Example
export function hash(data, salt = 0, times = 1) {
    let hash = data + salt;
    for (let i = 0; i < times; i++) {
        hash = CryptoJS.SHA512(salt + hash).toString();
    }
    return hash;
}