import { Fragment, useState } from "react";
import Image from "next/image";

interface ProductCardProps {
  logo: string;
  productImage: string;
  productName: string;
  description: string;
  flavors: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  logo,
  productImage,
  productName,
  description,
  flavors,
}) => {
  const [showAllFlavors, setShowAllFlavors] = useState(false);

  const toggleFlavors = () => {
    setShowAllFlavors(!showAllFlavors);
  };

  const displayedFlavors = showAllFlavors ? flavors : flavors?.slice(0, 3);

  return (
    <article className="flex flex-col bg-white rounded-lg shadow-md p-4 w-80 h-auto">
      <div className="w-24 h-16 relative self-end">
        {logo !== "" && (
          <Image src={logo} alt="" objectFit="contain" layout="fill" />
        )}
      </div>
      <div className="w-52 h-52 relative m-auto">
        <div className="relative w-52 h-52">
          <Image src={productImage} alt="" objectFit="contain" layout="fill" />
        </div>
      </div>
      <div>
        <h3 className="text-base font-medium">{productName}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        {flavors?.length == 0 ? null : (
          <Fragment>
            <p className="text-sm">Flavors:</p>
            <div className="flex flex-wrap gap-2">
              {displayedFlavors?.map((flavor, index) => (
                <span key={index} className="text-gray-600 text-xs">
                  {flavor}
                </span>
              ))}
            </div>
            {flavors?.length > 3 && (
              <button
                onClick={toggleFlavors}
                className="text-blue-500 text-sm mt-2 cursor-pointer"
              >
                {showAllFlavors ? "Ver menos" : "Ver más"}
              </button>
            )}
          </Fragment>
        )}
      </div>
    </article>
  );
};
