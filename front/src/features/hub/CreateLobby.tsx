import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../shared/libs/socket.ts";
import { useUserSelector } from "../../store/userSlice.ts";
import {
  removeLobby,
  setConnection,
  setLobby,
  useConnectionSelector,
  useLobbySelector,
} from "../../store/lobbySlice.ts";
import { SocketResponse } from "../../entities/socketResponse.ts";
import { Lobby } from "../../entities/lobby.ts";

export default function CreateLobby() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserSelector();
  const lobby = useLobbySelector();
  const isConnected = useConnectionSelector();
  const dispatch = useDispatch();

  const handleCopyURL = async () => {
    if (lobby)
      await navigator.clipboard.writeText(
        `${window.location.href}/?lobbyName=${lobby.name}&gameType=${lobby.gameType}`,
      );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const lobbyName = searchParams.get("lobbyName");
    const gameType = searchParams.get("gameType");
    if (!lobbyName || !gameType) {
      alert("Cannot connect to lobby");
      navigate("/home");
      return;
    }
    dispatch(
      setLobby({
        name: lobbyName,
        gameType: gameType,
        users: [],
      } as Lobby),
    );
    navigate(location.pathname.replace(/\/$/, ""), { replace: true });
  }, []);

  useEffect(() => {
    console.count("mounted");
    if (!lobby || !user || isConnected) return;

    dispatch(setConnection(true));
    socket.emit("login", user);
    socket.emit("joinRoom", lobby.name, lobby.gameType);
    socket.on("userJoined", (data: SocketResponse) => {
      dispatch(setLobby(data.lobbyResponse.lobby));
      // TODO:Dispatch settings in feature
    });
    //Because logic mb different
    socket.on("userLeaved", (data: SocketResponse) => {
      dispatch(setLobby(data.lobbyResponse.lobby));
    });
  }, [lobby]);

  useEffect(() => {
    return () => {
      if (!isConnected) return;
      socket.off("userJoined");
      socket.off("userLeaved");
      socket.emit("userLeaved");
      dispatch(removeLobby());
      dispatch(setConnection(false));
    };
  }, [isConnected]);

  return (
    <>
      {lobby &&
        lobby.users &&
        lobby.users.map((item) => (
          <div key={item.nickname}>
            <h3>{item.nickname}</h3>
            <img className="size-3" src={`../../assets/${item.avatar}.png`} alt="user avatar" />
          </div>
        ))}
      <br />
      <hr />
      {lobby?.name && <button onClick={handleCopyURL}>copy link</button>}
    </>
  );
}
