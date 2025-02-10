import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentCard from "../../components/common/ContentCard.tsx";

interface GameCardProps {
  name: string;
  description: string;
  imagePath: string;
}

function GameCard(props: GameCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    navigate("/createlobby", { state: { name: props.name } });
  };

  return (
    <ContentCard>
      <div
        className="relative flex items-center justify-center w-72 h-72 select-none overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Картинка и заголовок */}
        <div
          className={`absolute flex flex-col items-center justify-center transition-all duration-300 
        ${isHovered ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
        >
          <img alt="gameImg" className="size-24" src={props.imagePath} />
          <h2 className="mt-5 text-xl font-semibold">{props.name}</h2>
        </div>

        {/* Текст описания */}
        <p
          className={`absolute px-4 text-center text-gray-400 text-xl transition-all duration-300 
        ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
        >
          {props.description}
        </p>
      </div>
    </ContentCard>
  );
}

export default GameCard;
