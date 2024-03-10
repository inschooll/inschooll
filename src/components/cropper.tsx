import { useState, useCallback, useEffect } from "react";
import Cropper, { type Area } from "react-easy-crop";
import getCroppedImg from "~/lib/cropper/crop_image";
import { Button } from "./ui/button";

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
  setNewImage: ({croppedImage, file} : {croppedImage: string, file: File}) => void;
}) {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const getCroppedImage = useCallback(async (croppedAreaPixels: Area) => {
    try {
      const croppedImage = await getCroppedImg(
        img,
        croppedAreaPixels,
      );

      return croppedImage;
    } catch (e) {
      console.error(e)
    }
  }, [img]);


  const onCropComplete = useCallback( async (croppedArea: Area, croppedAreaPixels: Area) => {
      const croppedImage = await getCroppedImage(croppedAreaPixels);
      console.log(croppedImage);
      setCroppedImage(croppedImage!);
    }, [getCroppedImage],
  );

  useEffect(() => {
    // Ensure cropper displays above other html elements when it loads on the screen
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const cropperContainer = document.querySelector('[data-testid="container"]') as HTMLDivElement;

    if (cropperContainer) {
      cropperContainer.style.zIndex = "50";
      cropperContainer.style.position = "fixed";
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
          <Button disabled={croppedImage ? false : true} type="button" onClick={async () => {
            if (croppedImage) {
              await fetch(croppedImage)
              .then(b => b.blob())
              .then(blobFile => {
                const file = new File([blobFile], 'cover-image', {type: 'image/jpeg'});
                setNewImage({croppedImage, file});
              })
            }
          }}>
            Save Image
          </Button>
        </div>
      </div>
    </div>
  );
}
