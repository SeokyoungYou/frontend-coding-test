import { useAtom } from "jotai";
import {
  catOriginalStyleAtom,
  catSelectedImageAtom,
  catSelectedStyleAtom,
  catViewerAtom,
} from "./atom/catViewer";
import axios from "axios";
import { ColumnOne, ColumnTwo, ColumnThree } from "./components/ImageBox";

const IMAGE_LOAD_UNIT = 30;

function CatViewer() {
  const [catData, setCatData] = useAtom(catViewerAtom);
  const column1 = catData.images.filter((_, index) => index % 3 === 0);
  const column2 = catData.images.filter((_, index) => index % 3 === 1);
  const column3 = catData.images.filter((_, index) => index % 3 === 2);

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

  const fetchMoreCats = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CAT_API_URL}?limit=${IMAGE_LOAD_UNIT}&page=${catData.currentPage}&api_key=${process.env.REACT_APP_CAT_API_KEY}`
      );
      const newCats = response.data;
      setCatData((prev) => ({
        images: [...prev.images, ...newCats],
        currentPage: prev.currentPage + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <h1>1번 과제 - CatViewer</h1>
      <section className="flex mt-16  max-w-lg items-center  justify-center">
        <div className="grid grid-cols-3 gap-4 ">
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
      <button onClick={fetchMoreCats}>fetch more</button>
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
    </div>
  );
}

export default CatViewer;
