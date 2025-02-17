import { getLobby, createLobby, updateLobby } from "../services/lobbyService";
import { Lobby } from "../models/lobby";
import { UserSessionData } from "../models/user";
import { getUsersByIds } from "../services/userService";
import { Server } from "socket.io";

export default function socketController(io: Server) {
  io.on("connection", (socket) => {
    console.log(`Клиент подключился: ${socket.id}`);
    socket.broadcast.emit("message", `Клиент подключился: ${socket.id}`);

    socket.on("login", (user) => {
      console.log(`Пользователь авторизируется: ${user}`);
      socket.data.user = user as UserSessionData;
      console.log(`Пользователь авторизировался: ${socket.data.user.nickname}`);
    });

    socket.on("joinRoom", async (roomName) => {
      let lobby = await getLobby(roomName);

      if (!lobby) {
        const newLobby: Lobby = {
          name: roomName,
          users: [socket.data.user.id],
        };

        console.log(`Пользователь создаёт лобби: ${socket.data.user.nickname}`);
        lobby = await createLobby(newLobby);
        console.log(`Пользователь создал лобби: ${socket.data.user.nickname}`);
        console.log(`подключённые пользователи: `, lobby.users);
      } else {
        console.log(`Пользователь обновляет лобби: ${socket.data.user.nickname}`);
        if (lobby.users.find((value) => value === socket.data.user.id)) {
          console.log(`Пользователь уже подключен: ${socket.data.user.nickname}`);
          return;
        }
        lobby.users.push(socket.data.user.id);
        lobby = await updateLobby(lobby);
        console.log(`Пользователь обновил лобби: ${socket.data.user.nickname}`);
        console.log(`подключённые пользователи: `, lobby.users);
      }

      socket.join(roomName);
      const users = await getUsersByIds(lobby.users);
      const message = `Клиент ${socket.data.user.nickname} вошел в комнату: ${roomName}`;
      console.log(message);
      io.to(roomName).emit("userJoined", {
        sender: socket.data.user.nickname,
        message: message,
        users: users!.map((user) => user.nickname),
      });
    });

    socket.on("userLeaved", async (roomName) => {
      let lobby = await getLobby(roomName);

      if (lobby) {
        console.log(`Пользователь покидает лобби: ${socket.data.user.nickname}`);
        lobby.users = lobby.users.filter((value) => value !== socket.data.user.id);
        lobby = await updateLobby(lobby);
        console.log(`Пользователь покинул лобби: ${socket.data.user.nickname}`);
        console.log(`подключённые пользователи: `, lobby.users);
      }
    });

    socket.on("ping", () => {
      console.log(`ping: ${socket.id}  ${socket.data.user.nickname}`);
    });

    socket.on("disconnect", () => {
      console.log(`Клиент отключился: ${socket.id}`);
    });
  });
}
