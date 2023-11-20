import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Navbar from "./_components/navbar/navbar";
import images from "./core/constants/images";
import constants from "./core/constants/constants";
import links from "./core/constants/links";
import Button from "./_components/buttons/button";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerAuthSession();
  const profile = session ? await api.profile.getProfileByUserId.query({userId: session?.user.id}) : null;

  if (session?.user && !profile) redirect(links.completeRegistration);

  return (
    <div className="h-screen overflow-hidden bg-cc-background-main">
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main>
        {/* section 1 - empowering minds and shaping futures */}
        <div className="mt-10 lg:my-20">
          <div className="grid grid-cols-12">
            <div className="col-span-10 col-start-2 text-4xl sm:text-6xl font-extrabold text-center uppercase">
              <h1>
                Empowering minds
                <span className="pl-2 sm:pl-4 inline-block">
                  <Image src={images.brainPink} alt="brain icon" width={0} height={0} className="w-8 sm:w-[60px]" />
                </span>
                ,
              </h1>
              <h1 className="sm:mt-4">
                Shaping futures
                <span className="pl-4 pr-2 inline-block">
                <Image src={images.bookStack} alt="brain icon" width={0} height={0} className="w-8 sm:w-[60px]" />
                </span>
                .
              </h1>
            </div>

          </div>

          {/* section 2 - sub text and button */}
          <div className="mt-7">
            <div className="grid grid-cols-12 sm:block">

              <div className="col-span-10 col-start-2 col-end-12 sm:w-[600px] sm:mx-auto">
                <p className="font-medium text-center text-base sm:text-xl text-cc-content-main/50">{constants.appName} is the connected workspace where schools and students can thrive together.</p>
              </div>

            </div>

            <div className="flex justify-center mt-7">
              <Link href={links.signup}>
                <Button variant={"default"} className="px-12 py-2">Start today</Button>
              </Link>
              
              {/* <button className="bg-black shadow hover:shadow-none text-white hover:bg-gray-900 py-2 px-2 text-sm rounded-[4px] font-semibold">
                <div className="flex justify-around bg-redl-600 px-12 w-full">
                  <p className=" whitespace-nowrap">Start today</p>

                  <div className="flex items-center justify-end bg-lime-300 ">
                    <div className="inline-block h-5 w-1 bg-white"></div>
                    <div className="inline-block">
                      <Image src={constants.doubleArrowUp} alt="double arrow icon facing up" width={10} height={10} />
                    </div>
                  </div>
                </div>
              </button> */}
            </div>

          </div>

        </div>

        {/* Maths Calculations */}
        <div className="hidden sm:block fixed -bottom-28">
            <Image src={images.mathsCalculations} alt="maths calculations image" width={1500} height={280} className="opacity-30 bottom-0"/>
        </div>
        <div className="sm:hidden fixed bottom-0">
          <Image src={images.mathsCalculation} alt="maths calculations image" width={1500} height={280} className="opacity-30 bottom-0"/>
        </div>
      </main>
      
    </div>
  );
}