'use client';

import { useEffect } from "react";
import constants from "~/lib/constants/constants";
import { setTheme } from "~/lib/utils";

export default function SetTheme({theme}: {theme?: string}) {
  useEffect(() => {
    if (theme === constants.theme.light) {
      setTheme(constants.theme.light)
    }
    else if (theme === constants.theme.dark) {
      setTheme(constants.theme.dark)
    }
    else {
      setTheme(constants.theme.system)
    }
  }, [theme])
  return <></>
}