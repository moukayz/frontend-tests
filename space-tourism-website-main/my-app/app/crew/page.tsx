import Banner from "../components/Banner";
import CrewInfo, { CrewItem } from "../components/CrewInfo";

export default async function CrewPage() {
  const res = await fetch(`http://localhost:3000/data.json`);
  const data = await res.json();
  const crewItems: CrewItem[] = data.crew ?? [];

  return (
    <>
      <Banner title="Meet your crew" number="02" />
      <CrewInfo crewItems={crewItems} />
    </>
  );
}
