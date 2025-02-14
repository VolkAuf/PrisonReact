import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/hooks/useAuth.ts";
import { nanoid } from "nanoid";
import { SocketResponse } from "../../entities/SocketResponse.ts";
import { socket } from "../../shared/libs/socket.ts";

export default function CreateLobby() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState<string[]>([]);
  const { sessionData } = useAuth();
  const [lobbyName, setLobbyName] = useState("");

  useEffect(() => {
    //TODO: Check auth state
    const searchParams = new URLSearchParams(location.search);
    setLobbyName(searchParams.get("n") ?? nanoid(10));
    navigate(location.pathname, { replace: true });
  }, []);

  useEffect(() => {
    if (lobbyName) {
      console.log("sessionData ", sessionData);
      console.table(sessionData);
      socket.emit("login", sessionData); // Отправляем логин
      socket.emit("joinRoom", lobbyName); // Присоединяемся к комнате

      // Получаем обновленный список пользователей в комнате
      socket.on("userJoined", (data: SocketResponse) => {
        const usersName = JSON.parse(data.payload) as string[];
        setUsers(usersName);
      });
    }
  }, [lobbyName]);

  return (
    <>
      {users.map((user) => (
        <h3 key={user}>{user}</h3>
      ))}
      {lobbyName && <a href={`${location.pathname}/${lobbyName}`}>{lobbyName}</a>}
    </>
  );
}
