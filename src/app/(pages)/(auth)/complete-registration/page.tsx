// import { getServerAuthSession } from "~/server/auth";
// import AuthTitle from "../AuthTitle";
// import links from "~/app/core/constants/links";
// import { api } from "~/trpc/server";
// import { redirect } from "next/navigation";
// import FormBody from "./FormBody";

// export default async function CompleteRegistration() {
//   const session = await getServerAuthSession();
//   const profile = session?.user ? await api.profile.getProfileByUserId.query({userId: session?.user.id}) : null;

//   if (!session?.user) redirect(links.login);
//   if (profile) redirect(links.purpose);

//   return (
//     <>
//       <AuthTitle title="Complete Registration" />

//       <div className="mt-5">
//         {/* Intro text */}
//         <div className="mt-1 mb-4">
//           <p className="text-center font-semibold text-cc-content-sub/50">Complete your account creation by filling up and submitting the below form. ✨</p>
//         </div>
//         <div className="h-2 w-full border-b-2 border-cc-border-main"></div>
        
//         {/* Form */}
//         <FormBody />

//       </div>
//     </>
//   );
// }