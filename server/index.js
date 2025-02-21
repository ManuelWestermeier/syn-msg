import { areSetAndTheSameType as rset } from "are-set"
import { createServer } from "wsnet-server";

//create the websocket server on port 8080
createServer({ port: 28028 }, async (client) => {
  var isAuth = false;
  client.onGet("auth", data => {
    if (!rset(data, [["user", "string"], ["password", "string"]])) return;
  });
});