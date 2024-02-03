import { ImageType } from "../atom/catViewer";
import useClickImage from "../hooks/useClickImage";

function Image({ image, height }: { image: ImageType; height: string }) {
  const handleImageClick = useClickImage();

  return (
    <div className="relative overflow-hidden">
      <img
        key={image.id}
        src={image.url}
        alt={`cat-${image.id}`}
        className={`w-full object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 ${height}`}
        onClick={handleImageClick(image)}
      />
    </div>
  );
}

function ColumnOne({ image, index }: { image: ImageType; index: number }) {
  const heightClasses = ["h-40", "h-40", "h-36"];
  const height = heightClasses[index % heightClasses.length];
  return <Image image={image} height={height} />;
}

function ColumnTwo({ image, index }: { image: ImageType; index: number }) {
  const heightClasses = ["h-24", "h-36", "h-40"];
  const height = heightClasses[index % heightClasses.length];
  return <Image image={image} height={height} />;
}

function ColumnThree({ image, index }: { image: ImageType; index: number }) {
  const heightClasses = ["h-36", "h-40", "h-24"];
  const height = heightClasses[index % heightClasses.length];
  return <Image image={image} height={height} />;
}

export { ColumnOne, ColumnTwo, ColumnThree };
