"use client";
import { useState } from "react";
import { type popupType, usePopUpStore } from "./popup_store";
import { motion } from "framer-motion";

export default function PopUps() {
  const { popups, reset: removeLastPopup } = usePopUpStore();

  return (
    <>
      {popups.length > 0 &&
        popups.map((popup, index) => (
          <TopPopupBox
            key={index}
            text={popups[0]!.text}
            type={popups[0]!.type}
          />
        ))}
      {/* <TopPopupBox text={"What's up"} /> */}
    </>
  );
}

function TopPopupBox({ text, type = "default" }: popupType) {
  const bgColor = getBgColor();
  const [animate, setAnimate] = useState({ y: 0, opacity: 1 });

  function getBgColor() {
    switch (type) {
      case "error":
        return "bg-red-500 border-red-700";
      case "default":
        return "bg-cc-background-sub border-cc-border-main";
      case "warning":
        return "bg-yellow-500 border-yellow-700";
      case "success":
        return "bg-green-500 border-green-700";
    }
  }

  setTimeout(() => {
    setAnimate({ y: -10, opacity: 0 });
  }, 4000);

  return (
    <div className="relative">
      <div className={`fixed right-1/2 top-5 z-10`}>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: animate.y, opacity: animate.opacity }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <div
            className={`${bgColor} w-96 translate-x-1/2 rounded-lg border px-4 py-3 text-center`}
          >
            <p className="text-white">{text}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
