import { useAtom } from "jotai";
import { catViewerAtom } from "../atom/catViewer";
import axios from "axios";
import React, { useCallback } from "react";

const IMAGE_LOAD_UNIT = 30;
function useQueryCat() {
  const [catData, setCatData] = useAtom(catViewerAtom);
  const [loading, setLoading] = React.useState(false);

  const fetchCats = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_CAT_API_URL}?limit=${IMAGE_LOAD_UNIT}&page=${catData.currentPage}&api_key=${process.env.REACT_APP_CAT_API_KEY}`
      );
      const newCats = response.data;

      //   TODO: 서버측 에러 대응
      setCatData((prev) => ({
        images: [...prev.images, ...newCats],
        currentPage: prev.currentPage + 1,
      }));
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, [catData.currentPage, loading, setCatData]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        fetchCats();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchCats]);

  React.useEffect(() => {
    if (catData.currentPage === 0) {
      fetchCats();
    }
  }, [catData.currentPage, fetchCats]);

  return { catData, loading, fetchCats };
}
export default useQueryCat;
