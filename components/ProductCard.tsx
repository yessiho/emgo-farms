import Image from 'next/image'

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

export const ProductCard = ({ name, price, image }: ProductCardProps) => (
  <div className="bg-whiteBg shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
    <Image src={image} alt={name} width={400} height={250} className="object-cover w-full h-48" />
    <div className="p-4">
      <h3 className="text-greenPrimary font-bold text-lg">{name}</h3>
      <p className="text-gray-700 mt-2">{price}</p>
    </div>
  </div>
)
