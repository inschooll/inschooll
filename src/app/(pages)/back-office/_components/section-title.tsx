import Divider from "~/components/divider";
import { T4, T5, T6 } from "~/components/texts/title";

type TSectionTitle = {
  title: string;
  variant?: "sm" | "md" | "lg";
  className?: string;
  description?: string;
};

export const SectionTitle = ({
  title,
  variant = "md",
  className,
  description,
}: TSectionTitle) => {
  return (
    <div className={className}>
      {variant === "lg" && <T4>{title}</T4>}
      {variant === "md" && <T5>{title}</T5>}
      {variant === "sm" && <T6>{title}</T6>}
      <Divider className="mt-4" />

      {description && <p className="mt-3 text-cc-content/70">{description}</p>}
    </div>
  );
};