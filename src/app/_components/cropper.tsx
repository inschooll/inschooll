import { useState, useCallback, useEffect } from "react";
import Cropper, { type Area } from "react-easy-crop";
import Button from "./buttons/button";
import getCroppedImg from "~/app/core/cropper/crop_image";

export default function CropperPopup({
  img,
  aspectRaito,
  cropShape,
  setNewImage,
  ...props
}: {
  img: string;
  aspectRaito: number,
  cropShape?: "rect" | "round";
  setNewImage: (croppedImage: string) => void;
}) {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const getCroppedImage = async (croppedAreaPixels: Area) => {
    try {
      const croppedImage = await getCroppedImg(
        img,
        croppedAreaPixels,
      );

      return croppedImage as string;
    } catch (e) {
      console.error(e)
    }
  }


  const onCropComplete = useCallback( async (croppedArea: Area, croppedAreaPixels: Area) => {
      const croppedImage = await getCroppedImage(croppedAreaPixels);
      console.log(croppedImage);
      setCroppedImage(croppedImage!);
    }, [],
  );

  useEffect(() => {
    // Ensure cropper displays above other html elements when it loads on the screen
    const cropperContainer = document.querySelector('[data-testid="container"]') as HTMLDivElement;

    if (cropperContainer) {
      cropperContainer.style["z-index"] = 50;
      cropperContainer.style["position"] = "fixed";
      // cropperContainer.style['height'] = '80vh';
    }
  }, []);

  return (
    <div className="">
      <Cropper
        image={img}
        crop={crop}
        zoom={zoom}
        aspect={aspectRaito}
        cropShape={cropShape}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        {...props}
      />

      <div className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2">
        <div className="w-full" style={{ height: "20vh" }}>
          <Button variant="defaultFull" disabled={croppedImage ? false : true} type="button" onClick={() => {
            if (croppedImage) setNewImage(croppedImage);
          }}>
            Save Image
          </Button>
        </div>
      </div>
    </div>
  );
}
