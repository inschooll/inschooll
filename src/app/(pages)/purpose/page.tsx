
import TopNavbar from "~/components/navbar/navbar";
import PurposeBody from "./PurposeBody";

export default function Purpose() {

  return (
    <>
      <TopNavbar />

      <main className="p-5 sm:p-0 lg:mx-20 h-[80vh] group">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col justify-center gap-4 text-center sm:w-96 ">
            <h1 className="font-bold text-3xl">Who are you?</h1>
            <p className="text-cc-content/70">Pick any one of the options that best describes who you are 🤵</p>

            <PurposeBody />

          </div>
        </div>
      </main>
    </>
  )
}