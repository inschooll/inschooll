import { cn } from "~/lib/utils";

/**
 * This component displays a row of dots. When a dot is clicked on, it can 
 * take u to a particular component in the component history list
 * @param props 
 * @returns 
*/
export default function DotsNavbar(props: {
  numberOfDots: number;
  componentHistory: unknown[];
  onClick: (i: number) => void;
}) {
  const dots = Array(props.numberOfDots).fill("");

  const Dot = ({ i }: { i: number }) => (
    <div
      key={i}
      className={cn("size-2 rounded-full bg-cc-content/20", {
        "cursor-pointer bg-cc-primary/50": i < props.componentHistory.length,
        "cursor-pointer bg-cc-primary": i === props.componentHistory.length,
      })}
      onClick={() => props.onClick(i)}
    />
  );
  
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
      <div className="flex gap-5">
        {dots.map((_, i) => (<Dot key={i} i={i} />))}
      </div>
    </div>
  );
}
