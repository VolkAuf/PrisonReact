import { useEffect } from "react";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import ContentCard from "../../components/common/ContentCard.tsx";
import crocoImage from "../../assets/croc.png";
import GameCard from "../games/GameCard.tsx";

export default function Home() {
  const loremDesc =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aliquid, architecto autem corporis deleniti";
  useEffect(() => {});

  const solutions = [
    { name: "Analytics", description: loremDesc, href: "#", icon: ChartPieIcon },
    { name: "Engagement", description: loremDesc, href: "#", icon: CursorArrowRaysIcon },
    { name: "Security", description: loremDesc, href: "#", icon: FingerPrintIcon },
    { name: "Integrations", description: loremDesc, href: "#", icon: SquaresPlusIcon },
    { name: "Automations", description: loremDesc, href: "#", icon: ArrowPathIcon },
    { name: "Automations", description: loremDesc, href: "#", icon: ArrowPathIcon },
    { name: "Integrations", description: loremDesc, href: "#", icon: SquaresPlusIcon },
    { name: "Automations", description: loremDesc, href: "#", icon: ArrowPathIcon },
    { name: "Automations", description: loremDesc, href: "#", icon: ArrowPathIcon },
  ];

  return (
    <>
      <ContentCard>
        <div className="grid grid-cols-3 gap-5">
          {solutions.map((item) => (
            <GameCard key={item.name} name={item.name} description={item.description} imagePath={crocoImage}></GameCard>
          ))}
        </div>
      </ContentCard>
    </>
  );
}
