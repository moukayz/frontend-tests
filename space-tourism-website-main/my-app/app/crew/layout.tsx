import PageBackground from "../PageBackground";

export default function CrewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageBackground imageClass="bg-(image:--crew-bg-current)" />
      {children}
    </>
  );
}
