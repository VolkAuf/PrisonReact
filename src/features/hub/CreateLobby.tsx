import { useLocation } from "react-router-dom";

export default function CreateLobby() {
  const location = useLocation();
  const { name } = location.state || {}; // Защита от undefined

  return (
    <>
      <h3>{name}</h3>
    </>
  );
}
