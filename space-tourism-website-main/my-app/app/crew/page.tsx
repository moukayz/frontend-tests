import Banner from "../components/Banner";
import CrewInfo, { CrewItem } from "../components/CrewInfo";

export default async function CrewPage() {
  const res = await fetch(`http://localhost:3000/data.json`);
  const data = await res.json();
  const crewItems: CrewItem[] = data.crew ?? [];

  return (
    <div
      className="flex flex-col gap-6 lg:mx-auto h-full items-center lg:items-start lg:max-w-[80%] 
    overflow-y-auto lg:overflow-hidden lg:relative"
    >
      <Banner title="Meet your crew" number="02" />
      <CrewInfo crewItems={crewItems} />
    </div>
  );
}
