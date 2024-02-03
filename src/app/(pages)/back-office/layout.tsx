import BackOfficeHeader from "./_components/header";
import BackOfficeSidebar from "./_components/sidebar";

export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <div>
      <BackOfficeHeader />
      <div className="pt-5 flex justify-center min-h-screen">
        <div className="flex-1 xl:-translate-x-16 md:max-w-[68rem]">
          <div className="flex">
            {/* Left navbar */}
            <BackOfficeSidebar className="hidden lg:block" />

            <div className="flex-grow px-4 md:px-10 pb-10 w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


