import PageBackground from "../PageBackground";

export default function TechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageBackground imageClass="bg-(image:--tech-bg-current)" />
      {children}
    </>
  );
}
