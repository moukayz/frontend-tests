import Banner from "../components/Banner";
import DestInfo from "../components/DestInfo";

export default async function DestinationPage() {
  const res = await fetch(`http://localhost:3000/data.json`);
  const data = await res.json();
  const destItems = data.destinations ?? [];

  return (
    <>
      <Banner title="Pick your destination" number="01" />

      <DestInfo destItems={destItems} />
    </>
  );
}
