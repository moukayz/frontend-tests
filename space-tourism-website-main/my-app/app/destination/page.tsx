import Banner from "../components/Banner";
import DestInfo from "../components/DestInfo";

export default async function DestinationPage() {
  const res = await fetch(`http://localhost:3000/data.json`);
  const data = await res.json();
  const destItems = data.destinations ?? [];

  return (
    <div className="flex flex-col gap-6 lg:mx-auto h-full items-center lg:items-start overflow-y-auto ">
      <Banner title="Pick your destination" number="01" />

      <DestInfo destItems={destItems} />
    </div>
  );
}
