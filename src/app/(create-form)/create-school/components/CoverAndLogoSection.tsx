"use client";
import Image from "next/image";
import { useState } from "react";
import { IoCamera } from "react-icons/io5";
import CropperPopup from "~/app/_components/cropper";

export default function CoverAndLogoSection() {
  const [cover, setCover] = useState<string>();
  const [logo, setLogo] = useState<string>();

  const [coverCropperIsActive, setCoverCropperIsActive] =
    useState<boolean>(false);
  const [logoCropperIsActive, setLogoCropperIsActive] =
    useState<boolean>(false);

  function onClickChangeCover() {
    const coverInput = document.getElementById(
      "cover-input",
    ) as HTMLInputElement;
    coverInput.click();
    coverInput.addEventListener("change", function () {
      const file = coverInput.files![0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const image = e.target?.result as string;
          setCover(image);
          setCoverCropperIsActive(true);
        };

        reader.readAsDataURL(file);
      }
    });
  }

  function onClickChangeLogo() {
    const logoInput = document.getElementById("logo-input") as HTMLInputElement;
    logoInput.click();
    logoInput.addEventListener("change", function () {
      const file = logoInput.files![0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const image = e.target?.result as string;
          setLogo(image);
          // setLogoCropperIsActive(true);
        };

        reader.readAsDataURL(file);
      }
    });
  }

  return (
    <>
      {/* <div className="relative"> */}
      {cover && coverCropperIsActive && (
        <CropperPopup
          img={cover}
          aspectRaito={4 / 1.5}
          setNewImage={(croppedImg) => {
            setCover(croppedImg);
            setCoverCropperIsActive(false);
          }}
        />
      )}
      {logo && logoCropperIsActive && (
        <CropperPopup
          img={logo}
          aspectRaito={1}
          setNewImage={(croppedImg) => {
            setLogo(croppedImg);
            setLogoCropperIsActive(false);
          }}
        />
      )}
      {/* </div> */}

      <div className="relative">
        {/* Cover */}
        <div
          className="aspect-[3/1.2] w-full cursor-pointer overflow-hidden bg-zinc-800 transition-colors duration-200 hover:bg-zinc-900 sm:rounded-2xl"
          onClick={onClickChangeCover}
        >
          <input
            type="file"
            accept="images/*"
            className="hidden"
            id="cover-input"
          />
          {cover && (
            <Image
              src={cover}
              alt="school cover image"
              width={1000}
              height={0}
              className="h-full w-full object-cover"
            />
          )}

          {/* icon - change cover */}
          <div
            className="absolute right-3 top-7 z-20 -translate-y-1/2 cursor-pointer"
            title="select a school cover image. (any valid image format)"
          >
            <div className="flex items-center gap-2 rounded-md bg-white/10 p-1 px-2 py-1 backdrop-blur-md transition duration-200 hover:bg-white/20">
              <IoCamera size={20} className="text-white" />

              <p className="text-sm font-medium text-white/80">Change cover</p>
            </div>
          </div>
        </div>
        {/* Avatar */}
        <div
          className="absolute -bottom-[10%] left-1/2 -translate-x-1/2"
          onClick={onClickChangeLogo}
        >
          <div className={`aspect-square h-28 w-28 cursor-pointer overflow-hidden rounded-full border-4 border-cc-background-main ${!logo ? "bg-cc-primary-main hover:bg-cc-primary-sub" : "bg-zinc-800"} transition-colors duration-200`}>
            <input
              type="file"
              accept="images/*"
              className="hidden"
              id="logo-input"
            />
            {logo && (
              <div className="p-5">
                <Image
                  src={logo}
                  alt="school logo image"
                  width={100}
                  height={0}
                  className="h-full w-full object-cover "
                />
                
              </div>
            )}
          </div>
          {/* icon */}
          <div
            className="absolute bottom-0 right-0 z-20 -translate-y-1/2 cursor-pointer"
            title="select a school logo. (.png image format)"
          >
            <div className="rounded-full bg-white/40 p-1 backdrop-blur-md">
              <IoCamera
                size={20}
                className="text-black/50 transition duration-200 hover:text-black/80"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
