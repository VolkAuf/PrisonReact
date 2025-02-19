import { Game } from "../../entities/Game.ts";
import ContentCard from "../../components/common/ContentCard.tsx";
import GameCard from "../games/GameCard.tsx";
import gameList from "../../../games.json";

export default function Home() {
  const games: Game[] = gameList.objects;

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
