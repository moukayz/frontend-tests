import Banner from "../components/Banner";
import CrewInfo, { CrewItem } from "../components/CrewInfo";
import data from "@/public/data.json";

export default async function CrewPage() {
  const crewItems: CrewItem[] = data.crew ?? [];

  return (
    <div
      className="h-full flex flex-col gap-6 lg:mx-auto items-center lg:items-start lg:max-w-[80%] 
    lg:overflow-hidden lg:relative"
    >
      <Banner title="Meet your crew" number="02" />
      <CrewInfo crewItems={crewItems} />
    </div>
  );
}
