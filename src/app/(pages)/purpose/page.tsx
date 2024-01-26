
import TopNavbar from "~/components/navbar/navbar";
import PurposeBody from "./PurposeBody";

export default function Purpose() {

  return (
    <>
      <TopNavbar />

      <main className="p-5 sm:p-0 lg:mx-20 h-screen">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="sm:w-96 -translate-y-[20%] py-10">
            <h1 className="text-center font-bold text-2xl sm:text-3xl">
              Which option best describes you?
            </h1>

            <PurposeBody />

          </div>
        </div>
      </main>
    </>
  )
}