import PageBackground from "../PageBackground";

export default function DestinationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageBackground imageClass="bg-(image:--destination-bg-current)" />
      {children}
    </>
  );
}
