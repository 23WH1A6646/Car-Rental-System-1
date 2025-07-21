
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarImageGalleryProps {
  images: string[];
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
}

const CarImageGallery = ({
  images,
  currentImageIndex,
  onPrevImage,
  onNextImage,
}: CarImageGalleryProps) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative h-96">
        <img
          src={images[currentImageIndex]}
          alt={`Car view ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/80 rounded-full"
              onClick={onPrevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/80 rounded-full"
              onClick={onNextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 rounded-full px-2 py-1 text-xs text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onNextImage()}
              className={`w-20 h-14 rounded overflow-hidden flex-shrink-0 ${
                index === currentImageIndex ? 'ring-2 ring-rental-teal' : ''
              }`}
            >
              <img
                src={image}
                alt={`Car thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarImageGallery;
