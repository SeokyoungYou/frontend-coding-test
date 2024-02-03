import { useAtom } from "jotai";
import { catViewerAtom } from "../atom/catViewer";
import axios from "axios";
import React, { useCallback } from "react";

const IMAGE_LOAD_UNIT = 30;
function useQueryCat() {
  const [catData, setCatData] = useAtom(catViewerAtom);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  const fetchCats = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_CAT_API_URL}?limit=${IMAGE_LOAD_UNIT}&page=${catData.currentPage}&api_key=${process.env.REACT_APP_CAT_API_KEY}`
      );

      if (response && response.data) {
        setError(null);

        setCatData((prev) => ({
          images: [...prev.images, ...response.data],
          currentPage: prev.currentPage + 1,
        }));

        return;
      }

      setError("Failed to load new cats.\n The response was not as expected.");
    } catch (error) {
      setError("An error occurred while fetching cats.");
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

  return { catData, loading, fetchCats, error };
}
export default useQueryCat;
