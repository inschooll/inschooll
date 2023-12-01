import Link from "next/link";

export default function BreadCrumbs({patterns}: {patterns: Record<string, string>}) {
  // e.g dashboard > lessons > assignments > submission
  const pages = Object.keys(patterns);

  return (
    <div className="flex">
      {pages.map((page, i) => (
        <div key={page} className="flex text-cc-content-sub/50">
          <Link href={patterns[page]!}>
            <p className="hover:underline font-medium text-sm">
              {page}
            </p>
          </Link>

          {i < pages.length-1 && <div className="px-5 font-semibold">/</div>}
        </div>
      ))}
    </div>
  );
}