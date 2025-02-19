import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useUserSelector } from "../../store/userSlice.ts";
import { socket } from "../../shared/libs/socket.ts";
import { SocketResponse } from "../../entities/SocketResponse.ts";

export default function CreateLobby() {
  const requestLiteral = "n";
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState<string[]>([]);
  const [lobbyName, setLobbyName] = useState("");
  const user = useUserSelector();

  const handleCopyURL = async () => {
    await navigator.clipboard.writeText(`${window.location.href}/?${requestLiteral}=${lobbyName}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setLobbyName(searchParams.get(requestLiteral) ?? nanoid(10));
    navigate(location.pathname.replace(/\/$/, ""), { replace: true });
  }, []);

  useEffect(() => {
    if (lobbyName) {
      console.log("sessionData ", user);
      socket.emit("login", user); // Отправляем логин
      socket.emit("joinRoom", lobbyName); // Присоединяемся к комнате

      // Получаем обновленный список пользователей в комнате
      socket.on("userJoined", (data: SocketResponse) => {
        console.log("data", data);
        setUsers(data.users);
      });

      return () => {
        console.log("userLeaved ", lobbyName);
        socket.emit("ping", lobbyName);
        socket.emit("userLeaved", lobbyName);
      };
    }
  }, [lobbyName]);

  return (
    <>
      {users.map((user) => (
        <h3 key={user}>{user}</h3>
      ))}
      <br />
      <hr />
      {lobbyName && <button onClick={handleCopyURL}>copy link</button>}
    </>
  );
}
