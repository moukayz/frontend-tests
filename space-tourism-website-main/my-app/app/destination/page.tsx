import DestInfo from "../components/DestInfo";

export default async function DestinationPage() {
  const res = await fetch(`http://localhost:3000/data.json`);
  const data = await res.json();
  const destItems = data.destinations ?? [];

  return (
    <div className="flex flex-col p-6 h-full gap-6">
      <div className="inline-flex gap-4 font-main-wide uppercase justify-center">
        <span className="font-bold opacity-25">01</span>
        <span>Pick your destination</span>
      </div>

      <DestInfo destItems={destItems} />
    </div>
  );
}
