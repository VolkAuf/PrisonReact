import { useLocation } from "react-router-dom";

function CreateLobby() {
  const location = useLocation();
  const { name } = location.state || {}; // Защита от undefined
  return (
    <>
      <h3>{name}</h3>
    </>
  );
}

export default CreateLobby;
