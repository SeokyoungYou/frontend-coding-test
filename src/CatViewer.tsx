import { useAtom } from "jotai";
import { ImageType, catViewerAtom } from "./atom/catViewer";
import axios from "axios";
import { ColumnOne, ColumnTwo, ColumnThree } from "./components/ImageBox";

function CatViewer() {
  const [catData, setCatData] = useAtom(catViewerAtom);
  const column1 = catData.images.filter((_, index) => index % 3 === 0);
  const column2 = catData.images.filter((_, index) => index % 3 === 1);
  const column3 = catData.images.filter((_, index) => index % 3 === 2);

  const fetchMoreCats = async () => {
    try {
      const response = await axios.get(
        //   `${process.env.REACT_APP_CAT_API_URL}?limit=10&page=${catData.currentPage}&api_key=${API_KEY}`
        "https://api.thecatapi.com/v1/images/search?limit=10"
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
    </div>
  );
}

export default CatViewer;
