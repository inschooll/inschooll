
import Navbar from "~/app/_components/navbar/navbar";
import PurposeBody from "./PurposeBody";
import { protectPage } from "~/core/utils";

export default async function Purpose() {
  await protectPage();

  return (
    <>
      <Navbar />

      <main className="p-5 sm:p-0 sm:mx-10 lg:mx-20 h-full">
        <div className="sm:w-96 my-2 mx-auto h-full translate-y-[10%]">
          <h1 className="text-center font-bold text-2xl sm:text-3xl">
            Which option best describes you?
          </h1>

          <PurposeBody />

        </div>
      </main>
    </>
  )
}