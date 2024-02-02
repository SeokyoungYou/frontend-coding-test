import { atom } from "jotai";

type Response = {
  id: string;
  url: string;
  width: number;
  height: number;
}[];

type CatDataState = {
  images: Response[];
  currentPage: number;
};

export const catViewerAtom = atom<CatDataState>({
  images: [],
  currentPage: 0,
});
