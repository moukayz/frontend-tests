export default function PageBackground({ imageClass }: { imageClass: string }) {
  return (
    <div
      className={`fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat ${imageClass}`}
    ></div>
  );
}
