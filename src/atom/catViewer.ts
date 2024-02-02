import { atom } from "jotai";

export type ImageType = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type CatDataState = {
  images: ImageType[];
  currentPage: number;
};

export const catViewerAtom = atom<CatDataState>({
  images: [],
  currentPage: 0,
});
