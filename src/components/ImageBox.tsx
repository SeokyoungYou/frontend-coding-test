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

function ColumnOne({ image, index }: { image: ImageType; index: number }) {
  const components = [RedStyleImage, RedStyleImage, GreenStyleImage];
  const Component = components[index % components.length];
  return <Component image={image} />;
}

function ColumnTwo({ image, index }: { image: ImageType; index: number }) {
  const components = [BlueStyleImage, GreenStyleImage, RedStyleImage];
  const Component = components[index % components.length];
  return <Component image={image} />;
}

function ColumnThree({ image, index }: { image: ImageType; index: number }) {
  const components = [GreenStyleImage, RedStyleImage, BlueStyleImage];
  const Component = components[index % components.length];
  return <Component image={image} />;
}

export { ColumnOne, ColumnTwo, ColumnThree };
