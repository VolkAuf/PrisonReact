import { Server, Socket } from "socket.io";
import { getLobby, createLobby, updateLobby, deleteLobby } from "../services/lobbyService";
import { getUsersCosmeticByIds } from "../services/userService";
import { Lobby, LobbySettings, LobbySocketData } from "../models/lobby";
import { UserSessionData } from "../models/user";

export interface LobbyResponseModel {
  lobby: LobbySocketData;
  settings: LobbySettings;
}

export interface SocketResponse {
  sender: string;
  message: string;
  lobbyResponse: LobbyResponseModel;
}

export default function socketController(io: Server) {
  io.on("connection", (socket) => {
    console.log(`Клиент подключился: ${socket.id}`);
    socket.broadcast.emit("message", `Клиент подключился: ${socket.id}`);

    socket.on("login", (user) => socketOnLogin(socket, user));

    socket.on("joinRoom", (roomName, gameType) => socketOnJoinRoom(io, socket, roomName, gameType));

    socket.on("userLeaved", () => handleUserLeaved(io, socket, "leaved"));

    socket.on("disconnect", () => handleUserLeaved(io, socket, "disconnect"));

    socket.on("ping", () => socketOnPing(socket));
  });
}

const socketOnLogin = (socket: Socket, user: UserSessionData) => {
  console.log(`Пользователь авторизируется: ${user.nickname}`);
  socket.data.user = user as UserSessionData;
  console.log(`Пользователь авторизировался: ${socket.data.user.nickname}`);
};

const socketOnJoinRoom = async (io: Server, socket: Socket, roomName: string, gameType: string) => {
  let lobby = await getLobby(roomName);

  if (!lobby) {
    const newLobby: Lobby = {
      name: roomName,
      gameType: gameType,
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

  socket.data.lobbyName = roomName;
  socket.join(roomName);
  await handleLobbyUsersChange(io, socket.data.user.nickname, lobby, "userJoined");
};

const handleLobbyUsersChange = async (io: Server, username: string, lobby: Lobby, emitCommand: string) => {
  const users = await getUsersCosmeticByIds(lobby.users);
  const message = `Клиент ${username} обновил пользователей в комнате: ${lobby.name} Команда: ${emitCommand}`;
  console.log(message);

  const lobbySocketData = {
    ...lobby,
    users: users,
  } as LobbySocketData;

  io.to(lobby.name).emit(emitCommand, {
    sender: username,
    message: message,
    lobbyResponse: {
      lobby: lobbySocketData,
      settings: {},
    },
  } as SocketResponse);
};

const handleUserLeaved = async (io: Server, socket: Socket, reason: string) => {
  console.log(`handleUserLeaved with reason: ${reason}`);
  const roomName = socket.data.lobbyName as string;
  delete socket.data.lobbyName;
  let lobby = await getLobby(roomName);

  if (!lobby) {
    console.log("handleUserLeave without lobby");
    return;
  }

  const user = socket.data.user as UserSessionData;
  if (!user) {
    console.log("handleUserLeave without user");
    return;
  }

  console.log(`Пользователь: ${user.nickname} покидает лобби: ${lobby.name}`);
  const users = lobby.users.filter((value) => value !== user.id);
  if (users.length === 0) {
    const res = await deleteLobby(lobby);
    console.log(`Lobby was deleted with status: ${res.status} by user: ${user.nickname}`);
    return;
  }
  lobby.users = users;
  lobby = await updateLobby(lobby);
  console.log(`Пользователь покинул лобби: ${user.nickname}`);
  console.log(`подключённые пользователи: `, lobby.users);

  await handleLobbyUsersChange(io, user.nickname, lobby, "userLeaved");
};

const socketOnPing = (socket: Socket) => {
  console.log(`ping: ${socket.id}  ${socket.data.user.nickname}`);
  socket.broadcast.emit(`pong: ${socket.id}  ${socket.data.user.nickname}`);
};
