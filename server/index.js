import { areSetAndTheSameType as rset } from "are-set";
import { createServer } from "wsnet-server";
import * as crypto from '../utils/crypto.js'
import fs from "fs";
import { error } from "console";

const allowedMemberTypes = ["client", "admin", "listener"];

const users = JSON.parse(fs.readFileSync("./server/data/users.txt"));
const groups = {}

setInterval(() => {
  const data = {};
  for (const key in users) {
    data[key] = {
      ...users[key],
      clients: [],
    };
  }
  fs.writeFileSync("./server/data/users.txt", JSON.stringify(data, null, 3), "utf-8");
}, 10_000);

createServer({ port: 28028 }, async (client) => {
  let isAuth = false;
  let currentUser = false;

  async function sendUnreadedMessages() {
    try {
      const unreadMessages = users[currentUser].unread;
      for (const message of unreadMessages) {
        const res = await client.get("send-message", message);
        if (res instanceof Error) {
          return;
        }
      }
    } catch (error) { }

    users[currentUser].unread = [];
  }

  client.onGet("group:create", data => {
    if (!isAuth) return { error: "not auth" };

    if (!rset(data, [["name", "string"], ["members", "object"]])) {
      return { error: "Invalid data format" };
    }

    const id = crypto.randomBytes(5);

    const { name, members } = data;

    for (const key in members) {
      if (!allowedMemberTypes.includes(members[key])) {
        return { error: "wrong type in members" };
      }
    }

    if (groups[id]) return { error: "server error" };

    groups[id] = {
      name,
      members: { ...members, [currentUser]: "admin" },
      messages: [],
      joinPassword: crypto.randomBytes(5),
    };

    return { error: false, id };
  });

  client.onGet("group:join", data => {
    if (!isAuth) return { error: "not auth" };

    if (!rset(data, [["members", "string"], ["memberType", "string"], ["groupId", "string"]])) {
      return { error: "Invalid data format" };
    }
    const { member, memberType, groupId } = data;

    if (!users[member]) return { error: "user doesnt exist" };

    if (!groups[groupId]) return { error: "no group" };

    //user in group
    if (groups[groupId].members[currentUser] != "admin") return { error: "you arent admin" };

    //membertype
    if (!allowedMemberTypes.includes(memberType)) return { error: "wrong member type" };

    groups[groupId].members[member] = memberType;

    return { error: false, sucess: true };
  });

  client.onGet("group:send", async data => {
    if (!isAuth) return { error: "not auth" };

    if (!rset(data, [["message", "string"], ["groupId", "string"]])) {
      return { error: "Invalid data format" };
    }

    const { message, groupId } = data;

    if (!groups[groupId]) return { error: "no group" };
    if (groups[groupId].members[currentUser] == "listener") return { error: "you cannot write messages" };

    const { members } = groups[groupId];

    for (const member in members) {
      if (users[member]) {
        if (!users[member]?.clients?.length) {
          for (const client in users[member].clients) {
            const res = await client.get("send-message", message);
            if (res instanceof Error) {
              users[currentUser].unread.push(message);
            }
          }
        }
        else {
          users[currentUser].unread.push(message);
        }
      }
    }

    return { error: false, sucess: true };
  });

  client.onGet("group:leave", data => { });

  client.onGet("group:delete", data => { });

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
      sendUnreadedMessages();
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
      unread: [],
    };

    return { error: false, created: true };
  });

  client.onclose = () => {
    if (isAuth) {
      users[currentUser].clients = users[currentUser].clients.filter(cli => cli != client);
    }
  }
});

process.on("uncaughtException", err => error(err));