import { useSetAtom } from "jotai";
import {
  ImageType,
  catOriginalStyleAtom,
  catSelectedImageAtom,
  catSelectedStyleAtom,
} from "../atom/catViewer";

function useClickImage() {
  const setSelectedImage = useSetAtom(catSelectedImageAtom);
  const setSelecteedImageStyle = useSetAtom(catSelectedStyleAtom);
  const setOriginalStyle = useSetAtom(catOriginalStyleAtom);

  const handleImageClick =
    (image: ImageType) => (event: React.MouseEvent<HTMLImageElement>) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      setSelectedImage(image);
      const initialStyle = {
        position: "fixed",
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transition: "all 0.3s ease-in-out",
        zIndex: 50,
        transform: "translate(0, 0)",
      };
      setSelecteedImageStyle(initialStyle);
      setOriginalStyle(initialStyle);

      requestAnimationFrame(() => {
        setSelecteedImageStyle({
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "100vh",
          transform: "translate(-50%, -50%)",
          transition: "all 0.3s ease-in-out",
          zIndex: 50,
        });
      });
    };

  return handleImageClick;
}

export default useClickImage;
