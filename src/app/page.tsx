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
  const profile = session
    ? await api.profile.getProfileByUserId.query({ userId: session?.user.id })
    : null;

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
            <div className="col-span-10 col-start-2 text-center text-4xl font-extrabold uppercase sm:text-6xl">
              <h1>
                Empowering minds
                <span className="inline-block pl-2 sm:pl-4">
                  <svg
                    className="w-8 sm:w-[60px]"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M86.8866 42.1875C84.4987 21.6084 67.0331 5.625 45.8128 5.625H42.3478C20.5116 5.625 2.8125 23.3241 2.8125 45.1603C2.8125 48.8474 4.27719 52.3835 6.88436 54.9906C9.49152 57.5978 13.0276 59.0625 16.7147 59.0625H22.5703C22.9204 62.9048 24.694 66.4775 27.543 69.0793C30.392 71.6811 34.1105 73.1241 37.9688 73.125H67.5C72.7215 73.125 77.729 71.0508 81.4212 67.3587C85.1133 63.6665 87.1875 58.659 87.1875 53.4375V46.9997C87.1875 45.3684 87.0694 43.7681 86.8866 42.1875Z"
                      fill="#FF6DC6"
                    />
                    <path
                      d="M70.3125 73.0744V83.2106C70.3121 83.6275 70.1882 84.035 69.9564 84.3816C69.7246 84.7281 69.3953 84.9982 69.0101 85.1577C68.6249 85.3172 68.201 85.3589 67.7921 85.2777C67.3832 85.1965 67.0075 84.9959 66.7125 84.7012L55.1362 73.125L70.3125 73.0744ZM28.6256 21.195C28.7781 21.1473 28.9128 21.0552 29.0125 20.9304C29.1122 20.8056 29.1724 20.6539 29.1853 20.4947C29.3906 18.0478 29.5537 15.5925 29.5312 13.1034C28.7466 15.2241 28.125 17.3728 27.54 19.5272C22.2393 20.4049 17.4169 23.1213 13.9191 27.1997C10.3134 31.3537 8.24624 36.8606 8.59218 42.1875C10.08 37.1025 12.5184 32.6194 15.9328 29.0109C19.3764 25.39 23.693 22.715 28.4681 21.2428L28.6256 21.195ZM55.3556 14.5097C54.5962 12.9206 53.2547 11.6269 51.6712 10.7494C50.0906 9.84937 48.24 9.41906 46.4062 9.39656C44.5725 9.42469 42.7247 9.855 41.1441 10.755C39.5634 11.6297 38.2191 12.9234 37.4569 14.5097C40.5759 12.9825 43.4278 12.1894 46.4062 12.2091C49.3847 12.195 52.2281 12.9853 55.3556 14.5097ZM31.0922 42.4631C30.2356 42.7376 29.4076 43.0946 28.62 43.5291C28.5952 43.27 28.5549 43.0126 28.4991 42.7584C28.1961 41.5067 27.5561 40.3618 26.6484 39.4481C24.8456 37.6369 21.9319 36.8184 19.6875 37.9687C21.8672 39.0994 23.3466 40.1034 24.66 41.4337C25.5572 42.3225 26.3025 43.3012 27.0422 44.5022C26.3391 45 25.6584 45.5344 25.0425 46.1362C23.3691 47.8406 22.0584 49.9191 21.3637 52.1831C20.6522 54.4331 20.5087 56.8491 21.0937 59.0625C22.2244 54.6694 24.1341 51.0019 27.0281 48.1219C29.8997 45.2222 33.5756 43.3125 37.9687 42.1875C35.7553 41.6081 33.3394 41.7516 31.0922 42.4631ZM64.8056 54.9506C63.6244 55.1672 62.0522 54.945 60.4997 54.9225L55.89 54.8437C53.8341 54.8578 51.7753 54.9141 49.7194 54.9984C51.1453 53.4431 51.7303 51.0244 50.625 49.2187C49.4916 51.0328 48.6422 52.1409 47.5706 53.1956C46.8309 53.9409 46.0519 54.585 45.0366 55.2937C42.5109 55.5047 39.9853 55.7916 37.4597 56.25C43.605 57.3637 49.7475 57.6141 55.8928 57.6562L56.8941 57.6394C57.6225 58.1822 58.2384 58.7109 58.8234 59.3044C59.8894 60.3619 60.7387 61.47 61.8778 63.2812C62.4656 62.3559 62.5753 61.2281 62.3559 60.1706C62.1731 59.1947 61.6528 58.3116 60.9919 57.5578L62.8088 57.4791C63.5456 57.4734 64.5637 57.3637 65.3709 57.0684C68.8331 56.0278 70.9819 52.3266 70.3181 49.2216C69.7275 52.3069 67.3791 54.5203 64.8056 54.9506ZM82.5891 47.4272C81.8269 44.9916 80.4122 42.7612 78.6066 40.9247C76.77 39.1219 74.5369 37.7072 72.1012 36.945C70.6154 36.4697 69.0627 36.237 67.5028 36.2559C69.2325 34.4503 70.5966 32.2819 71.3363 29.9137C72.1209 27.495 72.2981 24.8991 71.7187 22.5C70.5937 27.2616 68.5322 31.3003 65.3709 34.4334C62.2322 37.5919 58.1991 39.6478 53.4375 40.7812C55.8366 41.3662 58.4353 41.1891 60.8541 40.4016C62.955 39.7434 64.8872 38.5791 66.5634 37.1194C70.5037 38.3147 73.9181 40.1794 76.6237 42.9075C79.7822 46.0462 81.8381 50.0794 82.9716 54.8409C83.5537 52.4447 83.3766 49.8459 82.5891 47.4272Z"
                      fill="#F70A8D"
                    />
                  </svg>
                </span>
                ,
              </h1>
              <h1 className="sm:mt-4">
                Shaping futures
                <span className="inline-block pl-4 pr-2">
                  <svg
                    className="w-8 sm:w-[60px]"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M37.5 77.5C37.5 83.0225 35.5225 87.5 30 87.5H12.5C2.5 87.5 2.5 52.5 12.5 52.5H30C35.5225 52.5 37.5 56.9775 37.5 62.5V77.5Z"
                      fill="#553788"
                    />
                    <path
                      d="M85 82.5H82.5V57.5H85C85.663 57.5 86.2989 57.2366 86.7678 56.7678C87.2366 56.2989 87.5 55.663 87.5 55C87.5 54.337 87.2366 53.7011 86.7678 53.2322C86.2989 52.7634 85.663 52.5 85 52.5H25C15 52.5 15 87.5 25 87.5H85C85.663 87.5 86.2989 87.2366 86.7678 86.7678C87.2366 86.2989 87.5 85.663 87.5 85C87.5 84.337 87.2366 83.7011 86.7678 83.2322C86.2989 82.7634 85.663 82.5 85 82.5Z"
                      fill="#9266CC"
                    />
                    <path
                      d="M85.43 82.5H27.5C22.5 82.5 22.5 57.5 27.5 57.5H85.43C88.19 57.5 88.19 82.5 85.43 82.5Z"
                      fill="#CCD6DD"
                    />
                    <path
                      d="M28.75 62.5H87.125C86.7875 59.5625 86.225 57.5 85.43 57.5H27.5C23.3725 57.5 22.655 74.52 25.3425 80.47C24.3625 73.0725 25.4975 62.5 28.75 62.5Z"
                      fill="#99AAB5"
                    />
                    <path
                      d="M30 20C30 22.6522 28.9464 25.1957 27.0711 27.0711C25.1957 28.9464 22.6522 30 20 30H10C2.38419e-07 30 2.38419e-07 2.5 10 2.5H20C22.6522 2.5 25.1957 3.55357 27.0711 5.42893C28.9464 7.3043 30 9.84783 30 12.5V20Z"
                      fill="#226699"
                    />
                    <path
                      d="M77.5 25H75V7.5H77.5C78.163 7.5 78.7989 7.23661 79.2678 6.76777C79.7366 6.29893 80 5.66304 80 5C80 4.33696 79.7366 3.70107 79.2678 3.23223C78.7989 2.76339 78.163 2.5 77.5 2.5H17.5C7.5 2.5 7.5 30 17.5 30H77.5C78.163 30 78.7989 29.7366 79.2678 29.2678C79.7366 28.7989 80 28.163 80 27.5C80 26.837 79.7366 26.2011 79.2678 25.7322C78.7989 25.2634 78.163 25 77.5 25Z"
                      fill="#55ACEE"
                    />
                    <path
                      d="M77.93 25H20C15 25 15 7.5 20 7.5H77.93C80.69 7.5 80.69 25 77.93 25Z"
                      fill="#CCD6DD"
                    />
                    <path
                      d="M20 12.5H79.8125C79.5275 9.6875 78.9025 7.5 77.93 7.5H20C17.0175 7.5 15.8275 13.7225 16.405 18.75C16.795 15.355 17.9825 12.5 20 12.5Z"
                      fill="#99AAB5"
                    />
                    <path
                      d="M50 42.5C50 45.1522 48.9464 47.6957 47.0711 49.5711C45.1957 51.4464 42.6522 52.5 40 52.5H15C5 52.5 5 30 15 30H40C42.6522 30 45.1957 31.0536 47.0711 32.9289C48.9464 34.8043 50 37.3478 50 40V42.5Z"
                      fill="#F4900C"
                    />
                    <path
                      d="M87.5 47.5H85V35H87.5C88.163 35 88.7989 34.7366 89.2678 34.2678C89.7366 33.7989 90 33.163 90 32.5C90 31.837 89.7366 31.2011 89.2678 30.7322C88.7989 30.2634 88.163 30 87.5 30H37.5C27.5 30 27.5 52.5 37.5 52.5H87.5C88.163 52.5 88.7989 52.2366 89.2678 51.7678C89.7366 51.2989 90 50.663 90 50C90 49.337 89.7366 48.7011 89.2678 48.2322C88.7989 47.7634 88.163 47.5 87.5 47.5Z"
                      fill="#FFAC33"
                    />
                    <path
                      d="M87.93 47.5H40C35 47.5 35 35 40 35H87.93C90.69 35 90.69 47.5 87.93 47.5Z"
                      fill="#CCD6DD"
                    />
                    <path
                      d="M40 40H89.96C89.7975 37.345 89.125 35 87.93 35H40C36.815 35 35.6675 40.0675 36.5425 43.75C37.0375 41.6525 38.185 40 40 40Z"
                      fill="#99AAB5"
                    />
                  </svg>
                </span>
                .
              </h1>
            </div>
          </div>

          {/* section 2 - sub text and button */}
          <div className="mt-7">
            <div className="grid grid-cols-12 sm:block">
              <div className="col-span-10 col-start-2 col-end-12 sm:mx-auto sm:w-[600px]">
                <p className="text-center text-base font-medium text-cc-content-main/50 sm:text-xl">
                  {constants.appName} is the connected workspace where schools
                  and students can thrive together.
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-center">
              <Link href={links.signup}>
                <Button variant={"default"} className="px-12 py-2">
                  Start today
                </Button>
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
        <div className="fixed -bottom-28 hidden sm:block">
          <Image
            src={images.mathsCalculations}
            alt="maths calculations image"
            width={1500}
            height={280}
            className="bottom-0 opacity-30"
          />
        </div>
        <div className="fixed bottom-0 sm:hidden">
          <Image
            src={images.mathsCalculation}
            alt="maths calculations image"
            width={1500}
            height={280}
            className="bottom-0 opacity-30"
          />
        </div>
      </main>
    </div>
  );
}
