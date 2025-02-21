import { areSetAndTheSameType as rset } from "are-set";
import { createServer } from "wsnet-server";
import * as crypto from '../utils/crypto.js'
import fs from "fs";
import { error } from "console";

const users = JSON.parse(fs.readFileSync("./server/data/data.txt"));

setInterval(() => {
  const data = {};
  for (const key in users) {
    data[key] = {
      ...users[key],
      clients: [],
    };
  }
  fs.writeFileSync("./server/data/data.txt", JSON.stringify(data, null, 3), "utf-8");
}, 10_000);

createServer({ port: 28028 }, async (client) => {
  let isAuth = false;
  let currentUser = false;

  client.onGet("update-user-data", data => {
    if (!isAuth) return { error: "not auth" };

    users[currentUser].data = data;

    return { error: false };
  });

  client.onGet("auth", (data) => {
    if (!rset(data, [["user", "string"], ["passwordHash", "string"]])) {
      return { error: "Invalid data format" };
    }

    const { user, passwordHash } = data;

    if (!users[user]) return { error: "user doesnt exist" };

    if (crypto.hash(passwordHash) == users[user].passwordHash) {
      users[user].clients.push(client);
      currentUser = user;
      isAuth = true;
      return { error: false, sucess: true };
    }
    else {
      isAuth = false;
      currentUser = "";
      return { error: "wrong password" };
    }
  });

  client.onGet("create-account", (data) => {
    if (!rset(data, [["user", "string"], ["passwordHash", "string"], ["userData", "string"]])) {
      return { error: "Invalid data format" };
    }

    const { user, passwordHash, userData } = data;

    if (users[user]) {
      return { error: "user exists" };
    }

    isAuth = true;
    currentUser = user;

    users[user] = {
      passwordHash: crypto.hash(passwordHash),
      data: userData,
      clients: [client],
      groups: {},
    };

    return { error: false, created: true };
  });

  client.onclose = () => {
    if (isAuth) {
      users[currentUser].clients = users[currentUser].clients.filter(cli => cli != client);
    }
  }
});