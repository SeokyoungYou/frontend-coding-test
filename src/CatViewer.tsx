import { useAtom } from "jotai";
import { catViewerAtom } from "./atom/catViewer";
import axios from "axios";

function CatViewer() {
  const [catData, setCatData] = useAtom(catViewerAtom);

  console.log("catData", catData);

  const fetchMoreCats = async () => {
    try {
      const response = await axios.get(
        //   `${process.env.REACT_APP_CAT_API_URL}?limit=10&page=${currentPage}&api_key=${API_KEY}`
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
    <div>
      <h1>1번 과제 - CatViewer</h1>
      <section className="flex mt-16 px-12 justify-center">
        <button onClick={fetchMoreCats}>fetch more</button>
      </section>
    </div>
  );
}

export default CatViewer;
