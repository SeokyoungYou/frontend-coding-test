import { ImageType } from "../atom/catViewer";

function RedStyleImage({ image }: { image: ImageType }) {
  return (
    <img
      key={image.id}
      src={image.url}
      alt={`Cat ${image.id}`}
      className="w-full h-40 object-cover"
    />
  );
}
function GreenStyleImage({ image }: { image: ImageType }) {
  return (
    <img
      key={image.id}
      src={image.url}
      alt={`Cat ${image.id}`}
      className="w-full h-36 object-cover"
    />
  );
}
function BlueStyleImage({ image }: { image: ImageType }) {
  return (
    <img
      key={image.id}
      src={image.url}
      alt={`Cat ${image.id}`}
      className="w-full h-24 object-cover"
    />
  );
}

export { RedStyleImage, GreenStyleImage, BlueStyleImage };
