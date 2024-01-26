import Link from "next/link";

export default function BreadCrumbs({patterns}: {patterns: Record<string, string>}) {
  // e.g dashboard > lessons > assignments > submission
  const pages = Object.keys(patterns);

  return (
    <div className="flex h-5">
      {pages.map((page, i) => (
        <div key={page} className="flex text-cc-content-sub">
          <Link href={patterns[page]!}>
            <div className="app-hover px-2.5 mx-1 py-0.5 rounded-md">
              <p className="text-sm">
                {page}
              </p>
            </div>
          </Link>

          {i < pages.length-1 && <span className=" text-cc-content-sub/50">/</span>}
        </div>
      ))}
    </div>
  );
}