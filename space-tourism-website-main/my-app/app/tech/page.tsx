import Banner from "../components/Banner";
import TechInfo from "../components/TechItem";
import data from "@/public/data.json";

export default async function TechPage() {
  const techItems = data.technology ?? [];

  return (
    <div className="h-full flex flex-col gap-6 lg:ml-auto items-center lg:items-start lg:max-w-[90%] lg:overflow-hidden">
      <Banner title="Space launch 101" number="03" />
      <TechInfo techItems={techItems} />
    </div>
  );
}
