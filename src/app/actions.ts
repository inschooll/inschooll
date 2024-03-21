'use server'
import { cookies } from "next/headers";
import { Ttheme } from "~/lib/types";


export async function getTheme() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  const theme = cookies().get("theme")?.value as Ttheme;
  if (!theme) cookies().set("theme", "system");
  return theme;
}