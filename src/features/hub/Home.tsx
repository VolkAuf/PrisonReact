import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth.ts";
import { Game } from "../../entities/Game.ts";
import ContentCard from "../../components/common/ContentCard.tsx";
import GameCard from "../games/GameCard.tsx";
import gameList from "../../../games.json";

export default function Home() {
  const navigate = useNavigate();
  const { sessionData } = useAuth();

  const games: Game[] = gameList.objects;

  useEffect(() => {
    if (!sessionData) navigate("/signIn");
  }, []);

  return (
    <ContentCard>
      <div className="grid gap-5 lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {games.map((item) => (
          <GameCard key={item.name} name={item.name} description={item.description} imagePath={item.icon} />
        ))}
      </div>
    </ContentCard>
  );
}
