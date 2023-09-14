import Image from "next/image";

interface ProductCardProps {
  logo: string;
  productImage: string;
  productName: string;
  description: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  logo,
  productImage,
  productName,
  description,
}) => {
  return (
    <article className="flex flex-col bg-white rounded-lg shadow-md p-4 w-60 h-96">
      <div className="w-12 h-12 relative self-end">
        <Image src={logo} alt="" objectFit="contain" layout="fill" />
      </div>
      <div className="w-52 h-52 relative">
        <Image src={productImage} alt="" objectFit="contain" layout="fill" />
      </div>
      <div>
        <h3 className="text-base font-medium">{productName}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </article>
  );
};
