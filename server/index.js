import { createServer } from "wsnet-server";

const users = {
  user1: {
    name: "",
    icon: "",
    description: "",
    posts: [
      {
        type: "text" || "image" || "video" || "audio",
        data: "",
        date: "",
      },
    ],
    publicAllowed: "name" || "icon" || "description" || "posts",
    contacts: [
      { id: "", allowed: "name" || "icon" || "description" || "posts" },
    ],
    groups: [""],
    password: "",
  },
};

const chats = {
  chat1: {
    key: "",
    name: "",
    icon: "",
    description: "",
    isOpen: false,
    users: [
      {
        type: "",
        id: "",
        lastRead: "",
        lastIncome: "",
      },
    ],
    messages: [
      {
        type:
          "text" ||
          "iframe" ||
          "contact" ||
          "email" ||
          "image" ||
          "video" ||
          "audio" ||
          "file" ||
          "opinion-call" ||
          "date" ||
          "location" ||
          "invention",
        data: "",
        id: "",
        time: "",
        comments: [
          {
            type: "text" || "image" || "emoji",
            data: "",
            from: "",
            id: "",
          },
        ],
        commented: false || "",
        from: "",
      },
    ],
  },
};

//create the websocket server on port 8080
createServer({ port: 28028 }, async (client) => {
  var isAuth = false;
  client.onParams((data) => {});
});