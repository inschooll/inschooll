import { redirect } from "next/navigation";
import links from "~/app/core/constants/links";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function getAuthProfile() {
  const session = await getServerAuthSession();
  const profile = session
    ? await api.profile.getProfileByUserId.query({ userId: session?.user.id })
    : null;

  return profile;
}

export async function protectPage() {
  const session = await getServerAuthSession();
  const profile = session
    ? await api.profile.getProfileByUserId.query({ userId: session?.user.id })
    : null;

  if (!session?.user || !profile) redirect(links.login);
  if (session?.user && !profile) redirect(links.completeRegistration);
}