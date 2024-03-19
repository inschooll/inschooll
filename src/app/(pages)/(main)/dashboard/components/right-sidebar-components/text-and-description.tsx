type TitleAndDescriptionProps = { title: string; description: string };

export default function TitleAndDescription({ title, description }: TitleAndDescriptionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      <p className="text-cc-content/70">{description}</p>
    </div>
  );
}