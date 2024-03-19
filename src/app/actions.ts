'use server'
import { cookies } from "next/headers";


export async function setCookies() {
  const theme = cookies().get("theme")?.value as Ttheme;
  if (!theme) cookies().set("theme", "system");
  return theme;
}