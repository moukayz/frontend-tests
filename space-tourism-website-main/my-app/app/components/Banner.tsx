export interface BannerProps {
  title: string;
  number: string;
}

export default function Banner({ title, number }: BannerProps) {
  return (
    <div className="inline-flex gap-6 font-main-wide uppercase justify-center">
      <span className="font-bold opacity-25">{number}</span>
      <span>{title}</span>
    </div>
  );
}
