import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/hooks/useAuth.ts";
import { nanoid } from "nanoid";
import { SocketResponse } from "../../entities/SocketResponse.ts";
import { socket } from "../../shared/libs/socket.ts";

export default function CreateLobby() {
  const requestLiteral = "n";
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState<string[]>([]);
  const { sessionData } = useAuth();
  const [lobbyName, setLobbyName] = useState("");
  const handleCopyURL = async () => {
    await navigator.clipboard.writeText(`${window.location.href}/?${requestLiteral}=${lobbyName}`);
  };

  useEffect(() => {
    //TODO: Check auth state
    const searchParams = new URLSearchParams(location.search);
    setLobbyName(searchParams.get(requestLiteral) ?? nanoid(10));
    navigate(location.pathname.replace(/\/$/, ""), { replace: true });
  }, []);

  useEffect(() => {
    if (lobbyName) {
      console.log("sessionData ", sessionData);
      socket.emit("login", sessionData); // Отправляем логин
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
