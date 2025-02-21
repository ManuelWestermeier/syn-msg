import { areSetAndTheSameType as rset } from "are-set";
import { createServer } from "wsnet-server";
import * as crypto from '../utils/crypto.js'

const users = {};

createServer({ port: 28028 }, async (client) => {
  let isAuth = false;
  let currentUser = false;

  client.onGet("auth", (data) => {
    if (!rset(data, [["user", "string"], ["passwordHash", "string"]])) {
      return { error: "Invalid data format" };
    }
    const { user } = data;
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
      passwordHash,
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