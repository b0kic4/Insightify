import Image from "next/image";
export default function Response({
  images,
  aiResponse,
}: {
  images: string[];
  aiResponse: string;
}) {
  console.log("ai response: ", aiResponse);
  return (
    <div className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Analysis Results
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Analysis result:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Screenshot ${index + 1}`}
              className="rounded-lg shadow-lg"
              width={500}
              height={500}
            />
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            AI Response
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            {aiResponse}
          </p>
        </div>
      </div>
    </div>
  );
}
