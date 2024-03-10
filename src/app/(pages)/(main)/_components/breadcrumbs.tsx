import Link from "next/link";
import { cn } from "~/lib/utils";

type BreadCrumbsProps = {patterns: Record<string, string>, className?: string,};

export default function BreadCrumbs({patterns, className}: BreadCrumbsProps) {
  // e.g dashboard > lessons > assignments > submission
  const pages = Object.keys(patterns);

  return (
    <div className={cn("flex p-2 text-cc-content-sub text-sm", className)}>
      {pages.map((page, i) => (
        <div key={page} className="flex">
          <Link href={patterns[page]!}>
            <div className="app-hover px-2 py-0.5 rounded-sm">
              <p>
                {page}
              </p>
            </div>
          </Link>

          {i < pages.length-1 && <span className="text-base text-cc-content-sub/50 px-1">/</span>}
        </div>
      ))}
    </div>
  );
}