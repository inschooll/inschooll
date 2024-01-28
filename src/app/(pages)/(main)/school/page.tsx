import links from "~/app/core/constants/links";


type SchoolPageProps = {
  searchParams: { q: string };
  params: Record<string, unknown>;
};

export default function SchoolPage(props: SchoolPageProps) {
  console.log(props);
  
  return (
    <div>/</div>
  );
}
