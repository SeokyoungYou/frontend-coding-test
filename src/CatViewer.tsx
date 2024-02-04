import { useAtom } from "jotai";
import {
  catOriginalStyleAtom,
  catSelectedImageAtom,
  catSelectedStyleAtom,
} from "./atom/catViewer";
import { ColumnOne, ColumnTwo, ColumnThree } from "./components/ImageBox";
import useQueryCat from "./hooks/useQueryCat";
import React from "react";
import { AlertCircle, MoreHorizontal } from "lucide-react";

function CatViewer() {
  const { catData, loading, error, fetchCats } = useQueryCat();
  const [column1, column2, column3] = [0, 1, 2].map((columnIndex) =>
    catData.images.filter((_, index) => index % 3 === columnIndex)
  );

  const [selectedImage, setSelectedImage] = useAtom(catSelectedImageAtom);
  const [imageStyle, setImageStyle] = useAtom(catSelectedStyleAtom);
  const [originalStyle, setOriginalStyle] = useAtom(catOriginalStyleAtom);

  const handleCloseModal = () => {
    setImageStyle(originalStyle);

    setTimeout(() => {
      setSelectedImage(null);
      setImageStyle({});
      setOriginalStyle({});
    }, 300);
  };

  return (
    <div className="flex flex-col items-center ">
      <h1>1번 과제 - CatViewer</h1>
      <section className="flex mt-16 max-w-[1200px] items-center  justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
          <div key="cat-col-1" className="flex flex-col gap-4">
            {column1.map((image, imageIndex) => (
              <ColumnOne key={image.id} image={image} index={imageIndex} />
            ))}
          </div>
          <div key="cat-col-2" className="flex flex-col gap-4">
            {column2.map((image, imageIndex) => (
              <ColumnTwo key={image.id} image={image} index={imageIndex} />
            ))}
          </div>
          <div key="cat-col-3" className="flex flex-col gap-4">
            {column3.map((image, imageIndex) => (
              <ColumnThree key={image.id} image={image} index={imageIndex} />
            ))}
          </div>
        </div>
      </section>
      {loading && (
        <MoreHorizontal size={48} color="black" className="animate-pulse" />
      )}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleCloseModal}
        >
          <img
            src={selectedImage.url}
            alt={`cat-fullscreen-${selectedImage.id}`}
            className="w-full h-full object-contain cursor-pointer"
            style={imageStyle}
          />
        </div>
      )}

      {error && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <section className="bg-white z-50  px-24 py-16 rounded-md flex items-center justify-center gap-4 flex-col">
            <div className="flex gap-2 items-center">
              <AlertCircle size={16} color="black" />
              <span className=" text-lg font-semibold">Error occured</span>
            </div>

            <span className=" text-gray-600 whitespace-pre">{error}</span>

            <div className=" flex gap-6">
              <button
                onClick={fetchCats}
                className="w-24 rounded-md py-2 bg-blue-700 text-gray-50"
              >
                retry
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-24 rounded-md py-2  text-blue-700 border border-blue-700"
              >
                refresh
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default CatViewer;
