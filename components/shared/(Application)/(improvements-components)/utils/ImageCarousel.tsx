import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const ImageCarousel = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  setImageLoading,
  imageLoading,
}: {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  imageLoading: boolean;
}) => {
  const handleImageChange = (newIndex: number) => {
    setImageLoading(true);
    setCurrentImageIndex(newIndex);
  };

  // FIXME: FIX IMAGE STYLING (COMPONENT SIZE AND IMAGE ZOOM)

  return (
    <div className="relative flex-shrink-0 w-full lg:w-full xl:w-full h-full mb-8 lg:mb-0 lg:px-4">
      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
        Screenshot {currentImageIndex + 1}
      </h3>
      <div className="relative w-full h-96 lg:h-[30rem]">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white/50"></div>
          </div>
        )}
        <Image
          src={images[currentImageIndex]}
          alt={`Screenshot ${currentImageIndex + 1}`}
          className="rounded-lg shadow-lg h-full"
          loading="lazy"
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setImageLoading(false)}
        />
      </div>
      <div className="absolute inset-0 flex items-end justify-between p-6">
        <Button
          variant="ghost"
          onClick={() => handleImageChange(Math.max(currentImageIndex - 1, 0))}
          disabled={currentImageIndex === 0}
          className={`py-2 px-4 rounded-md font-medium text-2xl ${
            currentImageIndex === 0
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            handleImageChange(
              Math.min(currentImageIndex + 1, images.length - 1),
            )
          }
          disabled={currentImageIndex === images.length - 1}
          className={`py-2 px-4 rounded-md font-medium text-2xl ${
            currentImageIndex === images.length - 1
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
