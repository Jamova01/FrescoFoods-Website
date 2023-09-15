interface StepCardProps {
  stepNumber: number;
  stepText: string;
  description: string;
  buttonText1?: string;
  buttonLink1?: string;
  buttonText2?: string;
  buttonLink2?: string;
}

export function StepCard({
  stepNumber,
  stepText,
  description,
  buttonText1,
  buttonLink1,
  buttonText2,
  buttonLink2,
}: StepCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full">
        {stepNumber}
      </div>
      <h2 className="text-xl font-semibold mt-4">{stepText}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex justify-between mt-4">
        {buttonText1 && buttonLink1 && (
          <a
            href={buttonLink1}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
          >
            {buttonText1}
          </a>
        )}
        {buttonText2 && buttonLink2 && (
          <a
            href={buttonLink2}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            {buttonText2}
          </a>
        )}
      </div>
    </div>
  );
}
